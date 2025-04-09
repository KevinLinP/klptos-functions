#!/bin/zsh

set -e

ncc build youtube-transcript.js -m --target es2024

zip -j deploy/youtube-transcript.zip dist/*

scw function deploy name=youtube-transcript namespace-id=2dfd141b-d6fd-4035-8db0-a83e32bba2bd zip-file=deploy/youtube-transcript.zip runtime=node22