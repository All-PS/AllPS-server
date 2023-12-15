#!/usr/bin/env bash

REPOSITORY=/root/allps-server

chmod +x $REPOSITORY/stop.sh
chmod +x $REPOSITORY/start.sh
chmod +x $REPOSITORY/health.sh
chmod +x $REPOSITORY/switch.sh
chmod +x $REPOSITORY/profile.sh
$REPOSITORY/stop.sh
$REPOSITORY/start.sh
$REPOSITORY/health.sh
