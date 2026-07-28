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

make_feature_segment() {
  local source_image="$1"
  local output_file="$2"
  local step_label="$3"
  local headline="$4"
  local line_one="$5"
  local line_two="$6"
  local line_three="$7"

  ffmpeg -y -loglevel error \
    -loop 1 -i "$source_image" \
    -filter_complex "
      [0:v]split=2[bg_source][phone_source];
      [bg_source]scale=1920:1080:force_original_aspect_ratio=increase,
        crop=1920:1080,boxblur=42:5,eq=brightness=-0.52:saturation=0.55[background];
      [phone_source]scale=-1:900[phone];
      [background]drawbox=x=0:y=0:w=1920:h=1080:color=0x030014@0.62:t=fill[dimmed];
      [dimmed][phone]overlay=x=150:y=90,
        drawbox=x=735:y=190:w=1035:h=700:color=0x0A0A23@0.78:t=fill,
        drawbox=x=735:y=190:w=6:h=700:color=0x22D3EE@0.95:t=fill,
        drawtext=fontfile='$press_font':text='$step_label':fontcolor=0x22D3EE:fontsize=30:x=800:y=255,
        drawtext=fontfile='$press_font':text='$headline':fontcolor=white:fontsize=58:x=800:y=325,
        drawtext=fontfile='$press_font':text='$line_one':fontcolor=0xE4E4EC:fontsize=33:x=800:y=455,
        drawtext=fontfile='$press_font':text='$line_two':fontcolor=0xE4E4EC:fontsize=33:x=800:y=510,
        drawtext=fontfile='$press_font':text='$line_three':fontcolor=0xE4E4EC:fontsize=33:x=800:y=565,
        drawtext=fontfile='$press_font':text='STARGAZING HUB':fontcolor=0xFFFFFF@0.55:fontsize=22:x=800:y=780,
        fade=t=in:st=0:d=0.5,
        fade=t=out:st=11.5:d=0.5,
        format=yuv420p[out]
    " \
    -map "[out]" -t 12 -r 30 -an \
    -c:v libx264 -preset veryfast -crf 19 -pix_fmt yuv420p "$output_file"
}

ffmpeg -y -loglevel error \
  -f lavfi -i "color=c=0x030014:s=1920x1080:r=30" \
  -loop 1 -i "$press_asset_dir/stargazinghub-icon-1024.png" \
  -filter_complex "
    [1:v]scale=250:250[icon];
    [0:v]drawbox=x=0:y=0:w=1920:h=1080:color=0x0A0A23@0.45:t=fill[base];
    [base][icon]overlay=x=835:y=170,
      drawtext=fontfile='$press_font':text='STARGAZING HUB':fontcolor=white:fontsize=72:x=(w-text_w)/2:y=485,
      drawtext=fontfile='$press_font':text='From planning the night to understanding what you captured':fontcolor=0xC9CAD6:fontsize=38:x=(w-text_w)/2:y=595,
      drawtext=fontfile='$press_font':text='A 60 second field workflow':fontcolor=0x22D3EE:fontsize=28:x=(w-text_w)/2:y=680,
      fade=t=in:st=0:d=0.5,
      fade=t=out:st=5.5:d=0.5,
      format=yuv420p[out]
  " \
  -map "[out]" -t 6 -r 30 -an \
  -c:v libx264 -preset veryfast -crf 19 -pix_fmt yuv420p "$press_work_dir/00-intro.mp4"

make_feature_segment \
  "$press_asset_dir/stargazinghub-observing-forecast.webp" \
  "$press_work_dir/01-forecast.mp4" \
  "01  PLAN THE NIGHT" \
  "Know before you go" \
  "Compare hourly and 15 day conditions" \
  "across multiple weather models" \
  "with Moon and observing context"

make_feature_segment \
  "$press_asset_dir/stargazinghub-sky-recognition.webp" \
  "$press_work_dir/02-recognition.mp4" \
  "02  IDENTIFY THE FIELD" \
  "Review a real photo offline" \
  "Import a wide field night sky image" \
  "identify the photographed region on device" \
  "and keep the original photo private"

make_feature_segment \
  "$press_asset_dir/stargazinghub-star-chart.webp" \
  "$press_work_dir/03-chart.mp4" \
  "03  EXPLORE THE SAME SKY" \
  "Move from photo to star chart" \
  "Open the recognized field in the sky map" \
  "with constellations terrain and horizon" \
  "plus directional light pollution simulation"

make_feature_segment \
  "$press_asset_dir/stargazinghub-light-pollution-map.webp" \
  "$press_work_dir/04-map.mp4" \
  "04  COMPARE DARKER SITES" \
  "Plan with light pollution" \
  "Compare locations before travelling" \
  "then combine darkness with forecasts" \
  "Moon conditions and observing time"

ffmpeg -y -loglevel error \
  -f lavfi -i "color=c=0x030014:s=1920x1080:r=30" \
  -loop 1 -i "$press_asset_dir/stargazinghub-icon-1024.png" \
  -filter_complex "
    [1:v]scale=220:220[icon];
    [0:v]drawbox=x=0:y=0:w=1920:h=1080:color=0x0A0A23@0.45:t=fill[base];
    [base][icon]overlay=x=850:y=180,
      drawtext=fontfile='$press_font':text='Built for the field':fontcolor=white:fontsize=68:x=(w-text_w)/2:y=470,
      drawtext=fontfile='$press_font':text='stargazinghub.com':fontcolor=0x22D3EE:fontsize=42:x=(w-text_w)/2:y=585,
      drawtext=fontfile='$press_font':text='Available on the App Store and Google Play':fontcolor=0xC9CAD6:fontsize=30:x=(w-text_w)/2:y=665,
      drawtext=fontfile='$press_font':text='Forecasts are planning guidance and do not guarantee observing conditions':fontcolor=0xFFFFFF@0.55:fontsize=22:x=(w-text_w)/2:y=855,
      fade=t=in:st=0:d=0.5,
      fade=t=out:st=5.5:d=0.5,
      format=yuv420p[out]
  " \
  -map "[out]" -t 6 -r 30 -an \
  -c:v libx264 -preset veryfast -crf 19 -pix_fmt yuv420p "$press_work_dir/05-outro.mp4"

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
  -ss 2 -i "$press_asset_dir/stargazinghub-field-workflow-2026.mp4" \
  -frames:v 1 -q:v 2 \
  "$press_asset_dir/stargazinghub-field-workflow-poster.jpg"

rm -f "$press_asset_dir/stargazinghub-press-kit-2026.zip"
(
  cd "$press_asset_dir"
  zip -q -9 "stargazinghub-press-kit-2026.zip" \
    "README.txt" \
    "stargazinghub-icon-1024.png" \
    "stargazinghub-observing-forecast.webp" \
    "stargazinghub-sky-recognition.webp" \
    "stargazinghub-star-chart.webp" \
    "stargazinghub-light-pollution-map.webp"
)

ffprobe -v error \
  -show_entries format=duration,size \
  -of default=noprint_wrappers=1 \
  "$press_asset_dir/stargazinghub-field-workflow-2026.mp4"
