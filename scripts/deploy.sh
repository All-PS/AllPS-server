#!/usr/bin/env bash

REPOSITORY=/root/allps-server

chmod +x $REPOSITORY/stop.sh
$REPOSITORY/stop.sh
chmod +x $REPOSITORY/start.sh
$REPOSITORY/start.sh
chmod +x $REPOSITORY/health.sh
$REPOSITORY/health.sh
