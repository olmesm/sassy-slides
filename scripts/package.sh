#!/bin/sh

DATE_TIME=$(date +%m%d%H%M%S)
OUTPUT=archive
INPUT=dist

mkdir $OUTPUT 2>/dev/null

zip -r "$(pwd)/$OUTPUT/archive-$DATE_TIME" "$INPUT"
