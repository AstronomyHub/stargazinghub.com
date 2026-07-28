#!/usr/bin/env bash
set -euo pipefail

press_repo_dir="$(cd "$(dirname "$0")/.." && pwd)"
press_asset_dir="$press_repo_dir/public/press"
press_work_dir="$(mktemp -d)"
press_font="/System/Library/Fonts/SFNS.ttf"

trap 'rm -rf "$press_work_dir"' EXIT

if ! command -v ffmpeg >/dev/null 2>&1; then
  echo "ffmpeg is required" >&2
  exit 1
fi

encode_architectural_card() {
  local source_image="$1"
  local output_file="$2"
  local index_label="$3"
  local section_label="$4"
  local headline_one="$5"
  local headline_two="$6"
  local detail_one="$7"
  local detail_two="$8"
  local detail_three="$9"

  ffmpeg -y -loglevel error \
    -f lavfi -i "color=c=0x111210:s=1920x1080:r=30:d=8" \
    -loop 1 -i "$source_image" \
    -filter_complex "
      [0:v]
        drawgrid=width=160:height=120:color=0xD8C8A8@0.055:t=1,
        drawbox=x=118:y=72:w=1684:h=936:color=0xE9E2D6@0.18:t=1,
        drawbox=x=118:y=72:w=8:h=936:color=0xB6955A@0.95:t=fill,
        drawbox=x=170:y=212:w=780:h=1:color=0xE9E2D6@0.26:t=fill,
        drawbox=x=1262:y=72:w=508:h=904:color=0xB6955A@0.42:t=2,
        drawbox=x=1280:y=90:w=508:h=904:color=0xE9E2D6@0.08:t=fill,
        drawtext=fontfile='$press_font':text='$index_label':fontcolor=0xB6955A:fontsize=28:x=170:y=126,
        drawtext=fontfile='$press_font':text='$section_label':fontcolor=0xE9E2D6@0.72:fontsize=24:x=276:y=130,
        drawtext=fontfile='$press_font':text='$headline_one':fontcolor=0xF0EAE0:fontsize=72:x=170:y=292,
        drawtext=fontfile='$press_font':text='$headline_two':fontcolor=0xF0EAE0:fontsize=72:x=170:y=378,
        drawtext=fontfile='$press_font':text='$detail_one':fontcolor=0xC9C1B4:fontsize=31:x=174:y=536,
        drawtext=fontfile='$press_font':text='$detail_two':fontcolor=0xC9C1B4:fontsize=31:x=174:y=586,
        drawtext=fontfile='$press_font':text='$detail_three':fontcolor=0xC9C1B4:fontsize=31:x=174:y=636,
        drawbox=x=170:y=835:w=780:h=1:color=0xE9E2D6@0.22:t=fill,
        drawtext=fontfile='$press_font':text='STARGAZING HUB':fontcolor=0xE9E2D6@0.62:fontsize=21:x=170:y=875,
        drawtext=fontfile='$press_font':text='FIELD NOTES  ·  2026':fontcolor=0xE9E2D6@0.38:fontsize=19:x=711:y=878,
        fade=t=in:st=0:d=0.45,
        fade=t=out:st=7.55:d=0.45[base];
      [1:v]
        scale=506:900:force_original_aspect_ratio=increase,
        crop=506:900,
        format=rgba,
        fade=t=in:st=0:d=0.55:alpha=1,
        fade=t=out:st=7.45:d=0.55:alpha=1[screen];
      [base][screen]
        overlay=x='1270+5*sin(t*0.55)':y='54+3*cos(t*0.45)':shortest=1,
        format=yuv420p[out]
    " \
    -map "[out]" -t 8 -r 30 -an \
    -c:v libx264 -preset medium -crf 19 -pix_fmt yuv420p "$output_file"
}

ffmpeg -y -loglevel error \
  -f lavfi -i "color=c=0x111210:s=1920x1080:r=30:d=4" \
  -loop 1 -i "$press_asset_dir/stargazinghub-icon-1024.png" \
  -filter_complex "
    [0:v]
      drawgrid=width=160:height=120:color=0xD8C8A8@0.055:t=1,
      drawbox=x=118:y=72:w=1684:h=936:color=0xE9E2D6@0.18:t=1,
      drawbox=x=118:y=72:w=8:h=936:color=0xB6955A@0.95:t=fill,
      drawbox=x=170:y=286:w=790:h=1:color=0xE9E2D6@0.26:t=fill,
      drawbox=x=1248:y=164:w=430:h=618:color=0xB6955A@0.54:t=2,
      drawbox=x=1282:y=198:w=430:h=618:color=0xE9E2D6@0.08:t=fill,
      drawtext=fontfile='$press_font':text='PRODUCT SEQUENCE':fontcolor=0xB6955A:fontsize=28:x=170:y=226,
      drawtext=fontfile='$press_font':text='Four field decisions':fontcolor=0xF0EAE0:fontsize=78:x=170:y=372,
      drawtext=fontfile='$press_font':text='for one observing night.':fontcolor=0xF0EAE0:fontsize=78:x=170:y=464,
      drawtext=fontfile='$press_font':text='A concise view of planning, recognition,':fontcolor=0xC9C1B4:fontsize=31:x=174:y=626,
      drawtext=fontfile='$press_font':text='sky exploration, and site comparison.':fontcolor=0xC9C1B4:fontsize=31:x=174:y=676,
      drawtext=fontfile='$press_font':text='STARGAZING HUB  ·  40 SECONDS':fontcolor=0xE9E2D6@0.56:fontsize=21:x=170:y=892,
      drawtext=fontfile='$press_font':text='40':fontcolor=0xF0EAE0:fontsize=196:x=1380:y=416,
      drawtext=fontfile='$press_font':text='SECONDS':fontcolor=0xB6955A:fontsize=28:x=1390:y=648,
      fade=t=in:st=0:d=0.45,
      fade=t=out:st=3.55:d=0.45[base];
    [1:v]scale=96:96,format=rgba,colorchannelmixer=aa=0.82[icon];
    [base][icon]overlay=x=1414:y=250,format=yuv420p[out]
  " \
  -map "[out]" -t 4 -r 30 -an \
  -c:v libx264 -preset medium -crf 19 -pix_fmt yuv420p "$press_work_dir/00-intro.mp4"

encode_architectural_card \
  "$press_asset_dir/stargazinghub-observing-forecast.webp" \
  "$press_work_dir/01-forecast.mp4" \
  "01 / 04" \
  "COMPOSE THE NIGHT" \
  "Decide when" \
  "to go." \
  "Hourly and 15-day outlooks" \
  "Multiple weather models in one view" \
  "Moon and observing context"

encode_architectural_card \
  "$press_asset_dir/stargazinghub-sky-recognition.webp" \
  "$press_work_dir/02-recognition.mp4" \
  "02 / 04" \
  "READ THE PHOTOGRAPH" \
  "Identify the" \
  "photographed field." \
  "Wide-field night-sky images" \
  "Analyzed quickly and offline" \
  "The original image stays on device"

encode_architectural_card \
  "$press_asset_dir/stargazinghub-star-chart.webp" \
  "$press_work_dir/03-chart.mp4" \
  "03 / 04" \
  "RECONSTRUCT THE SKY" \
  "Explore the" \
  "same field." \
  "A multilingual star chart" \
  "Terrain and horizon occlusion" \
  "Directional light pollution simulation"

encode_architectural_card \
  "$press_asset_dir/stargazinghub-light-pollution-map.webp" \
  "$press_work_dir/04-map.mp4" \
  "04 / 04" \
  "CHOOSE THE SITE" \
  "Compare darker" \
  "locations." \
  "Light pollution and terrain context" \
  "Forecasts, Moon, and observing time" \
  "Planning guidance, not a guarantee"

ffmpeg -y -loglevel error \
  -f lavfi -i "color=c=0xE7E0D4:s=1920x1080:r=30:d=4" \
  -loop 1 -i "$press_asset_dir/stargazinghub-icon-1024.png" \
  -filter_complex "
    [0:v]
      drawgrid=width=160:height=120:color=0x1A1B18@0.05:t=1,
      drawbox=x=118:y=72:w=1684:h=936:color=0x1A1B18@0.24:t=1,
      drawbox=x=118:y=72:w=8:h=936:color=0x9E7739@0.95:t=fill,
      drawbox=x=170:y=286:w=1130:h=1:color=0x1A1B18@0.24:t=fill,
      drawtext=fontfile='$press_font':text='BUILT FOR THE FIELD':fontcolor=0x9E7739:fontsize=28:x=170:y=226,
      drawtext=fontfile='$press_font':text='Plan less blindly.':fontcolor=0x171815:fontsize=82:x=170:y=378,
      drawtext=fontfile='$press_font':text='Observe with context.':fontcolor=0x171815:fontsize=82:x=170:y=478,
      drawtext=fontfile='$press_font':text='stargazinghub.com':fontcolor=0x171815:fontsize=39:x=174:y=672,
      drawbox=x=170:y=744:w=560:h=2:color=0x9E7739@0.88:t=fill,
      drawtext=fontfile='$press_font':text='Forecasts and maps are planning guidance.':fontcolor=0x171815@0.58:fontsize=22:x=170:y=882,
      drawtext=fontfile='$press_font':text='STARGAZING HUB  ·  EDITORIAL PREVIEW':fontcolor=0x171815@0.56:fontsize=21:x=1350:y=910,
      fade=t=in:st=0:d=0.45,
      fade=t=out:st=3.55:d=0.45[base];
    [1:v]scale=176:176,format=rgba[icon];
    [base][icon]overlay=x=1480:y=238,format=yuv420p[out]
  " \
  -map "[out]" -t 4 -r 30 -an \
  -c:v libx264 -preset medium -crf 19 -pix_fmt yuv420p "$press_work_dir/05-outro.mp4"

press_concat_file="$press_work_dir/concat.txt"
for press_segment in \
  "$press_work_dir/00-intro.mp4" \
  "$press_work_dir/01-forecast.mp4" \
  "$press_work_dir/02-recognition.mp4" \
  "$press_work_dir/03-chart.mp4" \
  "$press_work_dir/04-map.mp4" \
  "$press_work_dir/05-outro.mp4"; do
  printf "file '%s'\n" "$press_segment" >> "$press_concat_file"
done

ffmpeg -y -loglevel error \
  -f concat -safe 0 -i "$press_concat_file" \
  -c copy -movflags +faststart \
  "$press_asset_dir/stargazinghub-field-workflow-2026.mp4"

ffmpeg -y -loglevel error \
  -ss 7 -i "$press_asset_dir/stargazinghub-field-workflow-2026.mp4" \
  -frames:v 1 -q:v 2 \
  "$press_asset_dir/stargazinghub-field-workflow-poster.jpg"

ffprobe -v error \
  -show_entries format=duration,size \
  -of default=noprint_wrappers=1 \
  "$press_asset_dir/stargazinghub-field-workflow-2026.mp4"
