#!/usr/bin/env bash
set -Eeuo pipefail
IFS=$'\n\t'

# 30.000-second EDL with four purpose-specific overlaps:
#   Forecast 5.600s
#   Map 5.200s
#   Photo / Recognition 9.200s
#   Same-field Chart 8.200s
#   End 2.600s
#
# Total:
#   5.600 + 5.200 + 9.200 + 8.200 + 2.600
#   - (0.200 + 0.120 + 0.180 + 0.300)
#   = 30.000 seconds

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd -P)"

if command -v git >/dev/null 2>&1 \
  && REPO_ROOT="$(git -C "$SCRIPT_DIR" rev-parse --show-toplevel 2>/dev/null)"; then
  :
elif [[ -d "$SCRIPT_DIR/public/press" ]]; then
  REPO_ROOT="$SCRIPT_DIR"
elif [[ -d "$SCRIPT_DIR/../public/press" ]]; then
  REPO_ROOT="$(cd -- "$SCRIPT_DIR/.." && pwd -P)"
else
  REPO_ROOT="$SCRIPT_DIR"
fi

PRESS_DIR="$REPO_ROOT/public/press"
SOURCE_DIR="$PRESS_DIR/video-source"

FINAL_VIDEO="$PRESS_DIR/stargazinghub-field-workflow-2026.mp4"
FINAL_POSTER="$PRESS_DIR/stargazinghub-field-workflow-poster.jpg"
ANIMATIC_VIDEO="$PRESS_DIR/animatic-preview.mp4"

MOV_INPUTS=(
  "$SOURCE_DIR/01-forecast.mov"
  "$SOURCE_DIR/02-stargazing-index-map.mov"
  "$SOURCE_DIR/03-photo-recognition.mov"
  "$SOURCE_DIR/04-same-field-star-chart.mov"
)

WEBP_INPUTS=(
  "$PRESS_DIR/stargazinghub-observing-forecast.webp"
  "$PRESS_DIR/stargazinghub-stargazing-index-map.webp"
  "$PRESS_DIR/stargazinghub-sky-recognition.webp"
  "$PRESS_DIR/stargazinghub-star-chart.webp"
)

MODE="release"

case "${1:-}" in
  "")
    ;;
  --animatic)
    MODE="animatic"
    ;;
  *)
    printf 'Usage: %s [--animatic]\n' "$0" >&2
    exit 64
    ;;
esac

if (( $# > 1 )); then
  printf 'Usage: %s [--animatic]\n' "$0" >&2
  exit 64
fi

for command_name in ffmpeg ffprobe awk sed grep mktemp mv; do
  if ! command -v "$command_name" >/dev/null 2>&1; then
    printf 'Required command not found: %s\n' "$command_name" >&2
    exit 1
  fi
done

FFMPEG_ENCODERS="$(ffmpeg -hide_banner -encoders 2>/dev/null)"
FFMPEG_FILTERS="$(ffmpeg -hide_banner -filters 2>/dev/null)"

if [[ "$(printf '%s\n' "$FFMPEG_ENCODERS" \
  | grep -c '[[:space:]]libx264[[:space:]]' || true)" -lt 1 ]]; then
  echo 'This FFmpeg build does not provide the libx264 encoder.' >&2
  exit 1
fi

if [[ "$(printf '%s\n' "$FFMPEG_ENCODERS" \
  | grep -c '[[:space:]]aac[[:space:]]' || true)" -lt 1 ]]; then
  echo 'This FFmpeg build does not provide the AAC encoder.' >&2
  exit 1
fi

if [[ "$(printf '%s\n' "$FFMPEG_FILTERS" \
  | grep -c '[[:space:]]drawtext[[:space:]]' || true)" -lt 1 ]]; then
  echo 'This FFmpeg build does not provide the drawtext filter.' >&2
  exit 1
fi

if [[ "$(printf '%s\n' "$FFMPEG_FILTERS" \
  | grep -c '[[:space:]]xfade[[:space:]]' || true)" -lt 1 ]]; then
  echo 'This FFmpeg build does not provide the xfade filter.' >&2
  exit 1
fi

SANS_FONT=""

for candidate in \
  "/System/Library/Fonts/SFNS.ttf" \
  "/System/Library/Fonts/SFNSDisplay.ttf" \
  "/System/Library/Fonts/Supplemental/Arial.ttf" \
  "/Library/Fonts/Arial.ttf" \
  "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"; do
  if [[ -f "$candidate" ]]; then
    SANS_FONT="$candidate"
    break
  fi
done

if [[ -z "$SANS_FONT" ]]; then
  echo 'No compatible local sans-serif font was found.' >&2
  exit 1
fi

TITLE_FONT=""

for candidate in \
  "/System/Library/Fonts/NewYork.ttf" \
  "/System/Library/Fonts/NewYorkItalic.ttf" \
  "/System/Library/Fonts/Supplemental/Times New Roman.ttf" \
  "/usr/share/fonts/truetype/dejavu/DejaVuSerif.ttf"; do
  if [[ -f "$candidate" ]]; then
    TITLE_FONT="$candidate"
    break
  fi
done

if [[ -z "$TITLE_FONT" ]]; then
  TITLE_FONT="$SANS_FONT"
fi

mkdir -p -- "$PRESS_DIR"

# The temporary directory is created inside PRESS_DIR so the final mv operations
# are same-filesystem atomic renames. Formal assets are never pre-deleted.
WORK_DIR="$(mktemp -d "$PRESS_DIR/.build-press-video.XXXXXX")"

cleanup() {
  local exit_code=$?
  trap - EXIT HUP INT TERM
  rm -rf -- "$WORK_DIR"
  exit "$exit_code"
}

trap cleanup EXIT HUP INT TERM

# Escape values embedded inside single-quoted FFmpeg filter options.
# All visible copy is stored in text files so punctuation never enters the
# drawtext filter expression directly.
ff_filter_escape() {
  printf '%s' "$1" | sed \
    -e 's/\\/\\\\/g' \
    -e 's/:/\\:/g' \
    -e "s/'/\\\\'/g"
}

TITLE_FONT_FF="$(ff_filter_escape "$TITLE_FONT")"
SANS_FONT_FF="$(ff_filter_escape "$SANS_FONT")"

write_text_file() {
  local destination="$1"
  shift
  printf '%s\n' "$*" > "$destination"
}

write_text_file \
  "$WORK_DIR/forecast-title.txt" \
  "Know when to go"

write_text_file \
  "$WORK_DIR/forecast-sub.txt" \
  "Hourly and 15-day outlooks across multiple models"

write_text_file \
  "$WORK_DIR/map-title.txt" \
  "Choose where to stand"

write_text_file \
  "$WORK_DIR/map-sub.txt" \
  "Multi-model stargazing index and hourly trend"

write_text_file \
  "$WORK_DIR/photo-title.txt" \
  "Review what you captured"

write_text_file \
  "$WORK_DIR/recognition-title.txt" \
  "Recognize the field"

write_text_file \
  "$WORK_DIR/recognition-sub.txt" \
  "On device. No photo upload required."

write_text_file \
  "$WORK_DIR/chart-title.txt" \
  "Open the same sky"

write_text_file \
  "$WORK_DIR/chart-sub.txt" \
  "Terrain, horizon and directional light pollution"

write_text_file \
  "$WORK_DIR/end-title.txt" \
  "STARGAZING HUB"

write_text_file \
  "$WORK_DIR/end-sub.txt" \
  "Plan the night. Understand the sky."

write_text_file \
  "$WORK_DIR/watermark.txt" \
  "INTERNAL ANIMATIC · NOT FOR RELEASE"

probe_duration() {
  ffprobe \
    -v error \
    -show_entries format=duration \
    -of default=noprint_wrappers=1:nokey=1 \
    "$1"
}

require_video_input() {
  local input_path="$1"
  local minimum_duration="$2"
  local duration
  local video_stream

  if [[ ! -f "$input_path" ]]; then
    printf 'Missing required recording: %s\n' "$input_path" >&2
    exit 1
  fi

  video_stream="$(
    ffprobe \
      -v error \
      -select_streams v:0 \
      -show_entries stream=index \
      -of default=noprint_wrappers=1:nokey=1 \
      "$input_path"
  )"

  if [[ -z "$video_stream" ]]; then
    printf 'No video stream found in: %s\n' "$input_path" >&2
    exit 1
  fi

  duration="$(probe_duration "$input_path")"

  if ! awk -v value="$duration" '
    BEGIN {
      exit !(value ~ /^[0-9]+([.][0-9]+)?$/)
    }
  '; then
    printf 'Could not determine a numeric duration for: %s\n' \
      "$input_path" >&2
    exit 1
  fi

  if ! awk \
    -v actual="$duration" \
    -v minimum="$minimum_duration" '
      BEGIN {
        exit !(actual + 0.0001 >= minimum)
      }
    '; then
    printf \
      'Recording is too short: %s (%.3fs; need at least %.3fs)\n' \
      "$input_path" \
      "$duration" \
      "$minimum_duration" >&2
    exit 1
  fi
}

if [[ "$MODE" == "release" ]]; then
  # Fail before rendering if any unified-scene recording is missing or too short.
  require_video_input "${MOV_INPUTS[0]}" 5.60
  require_video_input "${MOV_INPUTS[1]}" 5.20
  require_video_input "${MOV_INPUTS[2]}" 9.20
  require_video_input "${MOV_INPUTS[3]}" 8.20

  INPUTS=("${MOV_INPUTS[@]}")
else
  for input_path in "${WEBP_INPUTS[@]}"; do
    if [[ ! -f "$input_path" ]]; then
      printf 'Missing required animatic still: %s\n' \
        "$input_path" >&2
      exit 1
    fi
  done

  INPUTS=("${WEBP_INPUTS[@]}")
fi

render_standard_segment() {
  local input_path="$1"
  local output_path="$2"
  local duration="$3"
  local title_path="$4"
  local subtitle_path="$5"
  local ui_y_offset="${6:-0}"

  local title_ff
  local subtitle_ff
  local -a input_args

  title_ff="$(ff_filter_escape "$title_path")"
  subtitle_ff="$(ff_filter_escape "$subtitle_path")"

  if [[ "$MODE" == "animatic" ]]; then
    input_args=(
      -loop 1
      -framerate 30
      -i "$input_path"
    )
  else
    input_args=(
      -i "$input_path"
    )
  fi

  ffmpeg \
    -y \
    -hide_banner \
    -loglevel error \
    "${input_args[@]}" \
    -filter_complex "
      [0:v]split=2[background_source][ui_source];

      [background_source]
        trim=duration=${duration},
        setpts=PTS-STARTPTS,
        fps=30,
        scale=2048:1152:force_original_aspect_ratio=increase,
        crop=
          1920:
          1080:
          x='64+18*t/${duration}':
          y='(ih-1080)/2+8*sin(2*PI*t/${duration})',
        boxblur=
          luma_radius=28:
          luma_power=2:
          chroma_radius=14:
          chroma_power=1,
        eq=brightness=-0.40:saturation=0.62,
        drawbox=
          x=0:
          y=0:
          w=iw:
          h=ih:
          color=0x02050A@0.30:
          t=fill,
        drawbox=
          x=0:
          y=0:
          w=980:
          h=1080:
          color=black@0.12:
          t=fill
        [background];

      [ui_source]
        trim=duration=${duration},
        setpts=PTS-STARTPTS,
        fps=30,
        scale=
          w='if(gte(a,1.7777778),1580,-2)':
          h='if(gte(a,1.7777778),-2,1380)',
        setsar=1
        [ui];

      [background][ui]
        overlay=
          x='W-w-170-8*t/${duration}':
          y='(H-h)/2+${ui_y_offset}':
          eval=frame:
          shortest=1,

        drawtext=
          fontfile='${TITLE_FONT_FF}':
          textfile='${title_ff}':
          reload=0:
          fontcolor=white:
          fontsize=68:
          fix_bounds=1:
          x=150:
          y=360:
          shadowcolor=black@0.28:
          shadowx=0:
          shadowy=3:
          alpha='
            if(
              lt(t,0.24),
              0,
              if(
                lt(t,0.52),
                (t-0.24)/0.28,
                if(
                  lt(t,2.20),
                  1,
                  if(
                    lt(t,2.55),
                    (2.55-t)/0.35,
                    0
                  )
                )
              )
            )
          ',

        drawtext=
          fontfile='${SANS_FONT_FF}':
          textfile='${subtitle_ff}':
          reload=0:
          fontcolor=white@0.74:
          fontsize=31:
          fix_bounds=1:
          x=154:
          y=466:
          alpha='
            if(
              lt(t,0.40),
              0,
              if(
                lt(t,0.68),
                (t-0.40)/0.28,
                if(
                  lt(t,2.05),
                  1,
                  if(
                    lt(t,2.40),
                    (2.40-t)/0.35,
                    0
                  )
                )
              )
            )
          ',

        format=yuv420p
        [video]
    " \
    -map "[video]" \
    -an \
    -t "$duration" \
    -r 30 \
    -fps_mode cfr \
    -c:v libx264 \
    -preset veryfast \
    -crf 12 \
    -pix_fmt yuv420p \
    "$output_path"
}

render_recognition_segment() {
  local input_path="$1"
  local output_path="$2"
  local duration="9.20"

  local photo_title_ff
  local recognition_title_ff
  local recognition_sub_ff
  local -a input_args

  photo_title_ff="$(
    ff_filter_escape "$WORK_DIR/photo-title.txt"
  )"

  recognition_title_ff="$(
    ff_filter_escape "$WORK_DIR/recognition-title.txt"
  )"

  recognition_sub_ff="$(
    ff_filter_escape "$WORK_DIR/recognition-sub.txt"
  )"

  if [[ "$MODE" == "animatic" ]]; then
    input_args=(
      -loop 1
      -framerate 30
      -i "$input_path"
    )
  else
    input_args=(
      -i "$input_path"
    )
  fi

  ffmpeg \
    -y \
    -hide_banner \
    -loglevel error \
    "${input_args[@]}" \
    -filter_complex "
      [0:v]split=2[background_source][ui_source];

      [background_source]
        trim=duration=${duration},
        setpts=PTS-STARTPTS,
        fps=30,
        scale=2048:1152:force_original_aspect_ratio=increase,
        crop=
          1920:
          1080:
          x='64+18*t/${duration}':
          y='(ih-1080)/2+8*sin(2*PI*t/${duration})',
        boxblur=
          luma_radius=28:
          luma_power=2:
          chroma_radius=14:
          chroma_power=1,
        eq=brightness=-0.40:saturation=0.62,
        drawbox=
          x=0:
          y=0:
          w=iw:
          h=ih:
          color=0x02050A@0.30:
          t=fill,
        drawbox=
          x=0:
          y=0:
          w=980:
          h=1080:
          color=black@0.12:
          t=fill
        [background];

      [ui_source]
        trim=duration=${duration},
        setpts=PTS-STARTPTS,
        fps=30,
        scale=
          w='if(gte(a,1.7777778),1580,-2)':
          h='if(gte(a,1.7777778),-2,1380)',
        setsar=1
        [ui];

      [background][ui]
        overlay=
          x='W-w-170-8*t/${duration}':
          y='(H-h)/2':
          eval=frame:
          shortest=1,

        drawtext=
          fontfile='${TITLE_FONT_FF}':
          textfile='${photo_title_ff}':
          reload=0:
          fontcolor=white:
          fontsize=64:
          fix_bounds=1:
          x=150:
          y=374:
          shadowcolor=black@0.28:
          shadowx=0:
          shadowy=3:
          alpha='
            if(
              lt(t,0.24),
              0,
              if(
                lt(t,0.50),
                (t-0.24)/0.26,
                if(
                  lt(t,1.55),
                  1,
                  if(
                    lt(t,1.90),
                    (1.90-t)/0.35,
                    0
                  )
                )
              )
            )
          ',

        drawtext=
          fontfile='${TITLE_FONT_FF}':
          textfile='${recognition_title_ff}':
          reload=0:
          fontcolor=white:
          fontsize=68:
          fix_bounds=1:
          x=150:
          y=360:
          shadowcolor=black@0.28:
          shadowx=0:
          shadowy=3:
          alpha='
            if(
              lt(t,1.95),
              0,
              if(
                lt(t,2.25),
                (t-1.95)/0.30,
                if(
                  lt(t,4.40),
                  1,
                  if(
                    lt(t,4.75),
                    (4.75-t)/0.35,
                    0
                  )
                )
              )
            )
          ',

        drawtext=
          fontfile='${SANS_FONT_FF}':
          textfile='${recognition_sub_ff}':
          reload=0:
          fontcolor=white@0.74:
          fontsize=31:
          fix_bounds=1:
          x=154:
          y=466:
          alpha='
            if(
              lt(t,2.12),
              0,
              if(
                lt(t,2.42),
                (t-2.12)/0.30,
                if(
                  lt(t,4.25),
                  1,
                  if(
                    lt(t,4.60),
                    (4.60-t)/0.35,
                    0
                  )
                )
              )
            )
          ',

        format=yuv420p
        [video]
    " \
    -map "[video]" \
    -an \
    -t "$duration" \
    -r 30 \
    -fps_mode cfr \
    -c:v libx264 \
    -preset veryfast \
    -crf 12 \
    -pix_fmt yuv420p \
    "$output_path"
}

render_standard_segment \
  "${INPUTS[0]}" \
  "$WORK_DIR/01-forecast.mp4" \
  5.60 \
  "$WORK_DIR/forecast-title.txt" \
  "$WORK_DIR/forecast-sub.txt"

render_standard_segment \
  "${INPUTS[1]}" \
  "$WORK_DIR/02-map.mp4" \
  5.20 \
  "$WORK_DIR/map-title.txt" \
  "$WORK_DIR/map-sub.txt" \
  80

render_recognition_segment \
  "${INPUTS[2]}" \
  "$WORK_DIR/03-recognition.mp4"

render_standard_segment \
  "${INPUTS[3]}" \
  "$WORK_DIR/04-chart.mp4" \
  8.20 \
  "$WORK_DIR/chart-title.txt" \
  "$WORK_DIR/chart-sub.txt"

# Derive the end card from the same-field chart itself rather than introducing
# an unrelated title card.
ffmpeg \
  -y \
  -hide_banner \
  -loglevel error \
  -ss 7.85 \
  -i "$WORK_DIR/04-chart.mp4" \
  -frames:v 1 \
  -update 1 \
  "$WORK_DIR/chart-end-frame.png"

END_TITLE_FF="$(
  ff_filter_escape "$WORK_DIR/end-title.txt"
)"

END_SUB_FF="$(
  ff_filter_escape "$WORK_DIR/end-sub.txt"
)"

ffmpeg \
  -y \
  -hide_banner \
  -loglevel error \
  -loop 1 \
  -framerate 30 \
  -i "$WORK_DIR/chart-end-frame.png" \
  -filter_complex "
    [0:v]
      scale=2016:1134:force_original_aspect_ratio=increase,
      crop=
        1920:
        1080:
        x='48+18*t/2.60':
        y='27+9*t/2.60',
      eq=brightness=-0.30:saturation=0.68,
      drawbox=
        x=0:
        y=0:
        w=iw:
        h=ih:
        color=black@0.42:
        t=fill,

      drawtext=
        fontfile='${SANS_FONT_FF}':
        textfile='${END_TITLE_FF}':
        reload=0:
        fontcolor=white:
        fontsize=30:
        fix_bounds=1:
        x=(w-text_w)/2:
        y=438:
        alpha='
          if(
            lt(t,0.14),
            0,
            if(
              lt(t,0.40),
              (t-0.14)/0.26,
              1
            )
          )
        ',

      drawtext=
        fontfile='${TITLE_FONT_FF}':
        textfile='${END_SUB_FF}':
        reload=0:
        fontcolor=white:
        fontsize=52:
        fix_bounds=1:
        x=(w-text_w)/2:
        y=505:
        shadowcolor=black@0.24:
        shadowx=0:
        shadowy=3:
        alpha='
          if(
            lt(t,0.28),
            0,
            if(
              lt(t,0.60),
              (t-0.28)/0.32,
              1
            )
          )
        ',

      format=yuv420p
      [video]
  " \
  -map "[video]" \
  -an \
  -t 2.60 \
  -r 30 \
  -fps_mode cfr \
  -c:v libx264 \
  -preset veryfast \
  -crf 12 \
  -pix_fmt yuv420p \
  "$WORK_DIR/05-end.mp4"

WATERMARK_FF="$(
  ff_filter_escape "$WORK_DIR/watermark.txt"
)"

TEMP_VIDEO="$WORK_DIR/output.mp4"

if [[ "$MODE" == "animatic" ]]; then
  FINAL_VIDEO_FILTER="
    [video_pre_watermark]
      drawtext=
        fontfile='${SANS_FONT_FF}':
        textfile='${WATERMARK_FF}':
        reload=0:
        fontcolor=white:
        fontsize=28:
        fix_bounds=1:
        box=1:
        boxcolor=0xA00000@0.86:
        boxborderw=14:
        x=(w-text_w)/2:
        y=h-text_h-38,
      format=yuv420p
      [video_out]
  "
else
  FINAL_VIDEO_FILTER="
    [video_pre_watermark]
      format=yuv420p
      [video_out]
  "
fi

# All audio is generated locally with FFmpeg lavfi:
#   - restrained pink-noise room tone
#   - short transition tones
#   - a brief filtered noise transient at the photo transition
ffmpeg \
  -y \
  -hide_banner \
  -loglevel error \
  -i "$WORK_DIR/01-forecast.mp4" \
  -i "$WORK_DIR/02-map.mp4" \
  -i "$WORK_DIR/03-recognition.mp4" \
  -i "$WORK_DIR/04-chart.mp4" \
  -i "$WORK_DIR/05-end.mp4" \
  -f lavfi \
  -i "anoisesrc=color=pink:amplitude=0.025:sample_rate=48000:duration=30" \
  -f lavfi \
  -i "sine=frequency=520:sample_rate=48000:duration=0.12" \
  -f lavfi \
  -i "anoisesrc=color=white:amplitude=0.10:sample_rate=48000:duration=0.11" \
  -f lavfi \
  -i "sine=frequency=620:sample_rate=48000:duration=0.12" \
  -f lavfi \
  -i "sine=frequency=392:sample_rate=48000:duration=0.55" \
  -filter_complex "
    [0:v][1:v]
      xfade=
        transition=fade:
        duration=0.20:
        offset=5.40
      [video_01];

    [video_01][2:v]
      xfade=
        transition=fadeblack:
        duration=0.12:
        offset=10.48
      [video_012];

    [video_012][3:v]
      xfade=
        transition=fade:
        duration=0.18:
        offset=19.50
      [video_0123];

    [video_0123][4:v]
      xfade=
        transition=fadeblack:
        duration=0.30:
        offset=27.40
      [video_pre_watermark];

    ${FINAL_VIDEO_FILTER};

    [5:a]
      pan=stereo|c0=c0|c1=c0,
      highpass=f=45,
      lowpass=f=1400,
      volume=0.12,
      afade=t=in:st=0:d=1.20,
      afade=t=out:st=28.55:d=1.45
      [ambience];

    [6:a]
      pan=stereo|c0=c0|c1=c0,
      volume=0.010,
      afade=t=out:st=0.08:d=0.08,
      adelay=5500|5500
      [map_tone];

    [7:a]
      pan=stereo|c0=c0|c1=c0,
      highpass=f=1200,
      lowpass=f=9000,
      volume=0.055,
      afade=t=out:st=0.045:d=0.065,
      adelay=10540|10540
      [photo_transient];

    [8:a]
      pan=stereo|c0=c0|c1=c0,
      volume=0.020,
      afade=t=out:st=0.07:d=0.07,
      adelay=19590|19590
      [chart_tone];

    [9:a]
      pan=stereo|c0=c0|c1=c0,
      volume=0.020,
      afade=t=in:st=0:d=0.10,
      afade=t=out:st=0.30:d=0.50,
      adelay=27550|27550
      [end_tone];

    [ambience]
    [map_tone]
    [photo_transient]
    [chart_tone]
    [end_tone]
      amix=
        inputs=5:
        duration=longest:
        dropout_transition=0:
        normalize=0,
      volume=36dB,
      alimiter=limit=0.70,
      atrim=duration=30,
      asetpts=N/SR/TB
      [audio_out]
  " \
  -map "[video_out]" \
  -map "[audio_out]" \
  -map_metadata -1 \
  -sn \
  -dn \
  -t 30.000 \
  -r 30 \
  -fps_mode cfr \
  -c:v libx264 \
  -preset slow \
  -crf 18 \
  -profile:v high \
  -level:v 4.1 \
  -pix_fmt yuv420p \
  -g 60 \
  -keyint_min 60 \
  -sc_threshold 0 \
  -c:a aac \
  -b:a 192k \
  -ar 48000 \
  -ac 2 \
  -movflags +faststart \
  "$TEMP_VIDEO"

validate_media() {
  local media_path="$1"

  local duration
  local video_codec
  local width
  local height
  local pixel_format
  local frame_rate
  local audio_codec
  local audio_sample_rate
  local audio_channels

  duration="$(
    ffprobe \
      -v error \
      -show_entries format=duration \
      -of default=noprint_wrappers=1:nokey=1 \
      "$media_path"
  )"

  if ! awk -v actual="$duration" '
    BEGIN {
      delta = actual - 30.0
      if (delta < 0) {
        delta = -delta
      }
      exit !(delta <= 0.05)
    }
  '; then
    printf \
      'Output duration validation failed: %.6fs (expected 30.000s ± 0.050s)\n' \
      "$duration" >&2
    exit 1
  fi

  video_codec="$(
    ffprobe \
      -v error \
      -select_streams v:0 \
      -show_entries stream=codec_name \
      -of default=noprint_wrappers=1:nokey=1 \
      "$media_path"
  )"

  width="$(
    ffprobe \
      -v error \
      -select_streams v:0 \
      -show_entries stream=width \
      -of default=noprint_wrappers=1:nokey=1 \
      "$media_path"
  )"

  height="$(
    ffprobe \
      -v error \
      -select_streams v:0 \
      -show_entries stream=height \
      -of default=noprint_wrappers=1:nokey=1 \
      "$media_path"
  )"

  pixel_format="$(
    ffprobe \
      -v error \
      -select_streams v:0 \
      -show_entries stream=pix_fmt \
      -of default=noprint_wrappers=1:nokey=1 \
      "$media_path"
  )"

  frame_rate="$(
    ffprobe \
      -v error \
      -select_streams v:0 \
      -show_entries stream=avg_frame_rate \
      -of default=noprint_wrappers=1:nokey=1 \
      "$media_path"
  )"

  audio_codec="$(
    ffprobe \
      -v error \
      -select_streams a:0 \
      -show_entries stream=codec_name \
      -of default=noprint_wrappers=1:nokey=1 \
      "$media_path"
  )"

  audio_sample_rate="$(
    ffprobe \
      -v error \
      -select_streams a:0 \
      -show_entries stream=sample_rate \
      -of default=noprint_wrappers=1:nokey=1 \
      "$media_path"
  )"

  audio_channels="$(
    ffprobe \
      -v error \
      -select_streams a:0 \
      -show_entries stream=channels \
      -of default=noprint_wrappers=1:nokey=1 \
      "$media_path"
  )"

  if [[ "$video_codec" != "h264" ]]; then
    printf 'Expected H.264 video, found: %s\n' \
      "${video_codec:-none}" >&2
    exit 1
  fi

  if [[ "$width" != "1920" || "$height" != "1080" ]]; then
    printf 'Expected 1920x1080, found: %sx%s\n' \
      "${width:-0}" \
      "${height:-0}" >&2
    exit 1
  fi

  if [[ "$pixel_format" != "yuv420p" ]]; then
    printf 'Expected yuv420p, found: %s\n' \
      "${pixel_format:-none}" >&2
    exit 1
  fi

  if ! awk -F/ -v rate="$frame_rate" '
    BEGIN {
      split(rate, parts, "/")

      if (parts[2] == 0 || parts[2] == "") {
        exit 1
      }

      fps = parts[1] / parts[2]
      delta = fps - 30

      if (delta < 0) {
        delta = -delta
      }

      exit !(delta <= 0.01)
    }
  '; then
    printf 'Expected 30 fps, found: %s\n' \
      "${frame_rate:-none}" >&2
    exit 1
  fi

  if [[ "$audio_codec" != "aac" ]]; then
    printf 'Expected AAC audio, found: %s\n' \
      "${audio_codec:-none}" >&2
    exit 1
  fi

  if [[ "$audio_sample_rate" != "48000" ]]; then
    printf 'Expected 48000 Hz audio, found: %s\n' \
      "${audio_sample_rate:-none}" >&2
    exit 1
  fi

  if [[ "$audio_channels" != "2" ]]; then
    printf 'Expected stereo audio, found %s channel(s)\n' \
      "${audio_channels:-0}" >&2
    exit 1
  fi
}

# Validate the temporary MP4 before replacing any deliverable.
validate_media "$TEMP_VIDEO"

if [[ "$MODE" == "release" ]]; then
  TEMP_POSTER="$WORK_DIR/poster.jpg"

  ffmpeg \
    -y \
    -hide_banner \
    -loglevel error \
    -ss 20.85 \
    -i "$TEMP_VIDEO" \
    -frames:v 1 \
    -vf "scale=1920:1080:flags=lanczos" \
    -q:v 2 \
    "$TEMP_POSTER"

  poster_width="$(
    ffprobe \
      -v error \
      -select_streams v:0 \
      -show_entries stream=width \
      -of default=noprint_wrappers=1:nokey=1 \
      "$TEMP_POSTER"
  )"

  poster_height="$(
    ffprobe \
      -v error \
      -select_streams v:0 \
      -show_entries stream=height \
      -of default=noprint_wrappers=1:nokey=1 \
      "$TEMP_POSTER"
  )"

  if [[ "$poster_width" != "1920" || "$poster_height" != "1080" ]]; then
    printf 'Poster validation failed: %sx%s\n' \
      "${poster_width:-0}" \
      "${poster_height:-0}" >&2
    exit 1
  fi

  # Both source files are already complete and validated.
  # Because WORK_DIR is inside PRESS_DIR, each mv is an atomic rename on the
  # same filesystem. No existing formal asset is removed beforehand.
  mv -f -- "$TEMP_POSTER" "$FINAL_POSTER"
  mv -f -- "$TEMP_VIDEO" "$FINAL_VIDEO"

  DELIVERABLE="$FINAL_VIDEO"
else
  # Animatic mode never reads, writes or replaces the formal MP4 or poster.
  mv -f -- "$TEMP_VIDEO" "$ANIMATIC_VIDEO"

  DELIVERABLE="$ANIMATIC_VIDEO"
fi

# Confirm the installed deliverable, not only the temporary build.
validate_media "$DELIVERABLE"

printf 'Built and validated: %s\n' "$DELIVERABLE"

ffprobe \
  -v error \
  -show_entries \
format=duration:stream=index,codec_type,codec_name,width,height,pix_fmt,avg_frame_rate,sample_rate,channels \
  -of default=noprint_wrappers=1 \
  "$DELIVERABLE"
