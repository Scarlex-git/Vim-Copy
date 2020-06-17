[colors]
;background = ${xrdb:color0:#222}
background = #aa222222
background-alt = #ee222222
;foreground = ${xrdb:color7:#222}
foreground = #fbf1c7
foreground-alt = #fe8019
primary = #ffb52a
secondary = #e60053
alert = #bd2c40

[bar/example]
;monitor = ${env:MONITOR:HDMI-1}
width = 99%
height = 20
offset-x = 0.5%
offset-y = 4
radius = 8.0
fixed-center = true
background = ${colors.background}
foreground = ${colors.foreground}
line-size = 0
line-color = #00000000
border-size = 0
border-color = #00000000
padding-left = 0
padding-right = 2
module-margin-left = 2
module-margin-right = 2
font-0 = Noto Sans CJK JP:style=Bold:size=8;1
font-1 = FiraCode Nerd Font Mono:style=Bold:size=12;1

modules-left = bspwm 
modules-center = mpd
modules-right = filesystem pulseaudio cpu temperature date powermenu
;removed : xbacklight,memory pulseaudio xkeyboard wlan eth battery
tray-position = right
tray-padding = 0
;tray-background = #0063ff

wm-restack = bspwm

;override-redirect = true

;scroll-up = bspwm-desknext
;scroll-down = bspwm-deskprev

;scroll-up = i3wm-wsnext
;scroll-down = i3wm-wsprev

cursor-click = pointer
cursor-scroll = ns-resize

[module/xwindow]
type = internal/xwindow
label = %title:0:30:...%

[module/xkeyboard]
type = internal/xkeyboard
blacklist-0 = num lock

format-prefix = " "
format-prefix-foreground = ${colors.foreground-alt}
format-prefix-underline = ${colors.secondary}

label-layout = %layout%
label-layout-underline = ${colors.secondary}

label-indicator-padding = 2
label-indicator-margin = 1
label-indicator-background = ${colors.secondary}
label-indicator-underline = ${colors.secondary}

[module/filesystem]
type = internal/fs
interval = 25

mount-0 = /

label-mounted = %{F#0a81f5}%mountpoint%%{F-}: %used% of %total%
label-unmounted = %mountpoint% not mounted
label-unmounted-foreground = ${colors.foreground-alt}

[module/bspwm]
type = internal/bspwm


label-focused = ﰟ
;label-focused-background = ${colors.background-alt}
label-focused-background = #99ff4545
label-focused-foreground = #ddefef
label-focused-padding = 1

label-occupied = ﰟ
label-occupied-background = #55ff3939
label-occupied-foreground = #ddefef
label-occupied-padding = 1

label-urgent = ﰟ!
label-urgent-background = #88ff5959
;label-urgent-background = ${colors.alert}
label-urgent-padding = 1

label-empty = ﰟ
label-empty-underling = #88ff3939
label-empty-foreground = #ddff5959
label-empty-background = #55ff3535
label-empty-padding = 1

; Separator in between workspaces
; label-separator = |

[module/mpd]
type = internal/mpd
format-online = <label-song>  <icon-prev> <icon-stop> <toggle> <icon-next>
label-active-font = 1

icon-prev = 
icon-stop = 
icon-play = 
icon-pause = 
icon-next = 

label-song-maxlen = 120
label-song-ellipsis = false

[module/xbacklight]
type = internal/xbacklight

format = <label> <bar>
label = BL

bar-width = 40
bar-indicator = |
bar-indicator-foreground = #fff
bar-indicator-font = 0
bar-fill = ─
bar-fill-font = 0
bar-fill-foreground = #9f78e1
bar-empty = ─
bar-empty-font = 0
bar-empty-foreground = ${colors.foreground-alt}

[module/backlight-acpi]
inherit = module/xbacklight
type = internal/backlight
card = intel_backlight

[module/cpu]
type = internal/cpu
interval = 2
format-prefix = " "
format-prefix-foreground = ${colors.foreground-alt}
format-underline = #fb4934
label = %percentage:2%%

[module/memory]
type = internal/memory
interval = 2
format-prefix = " "
format-prefix-foreground = ${colors.foreground-alt}
format-underline = #4bffdc
label = %percentage_used%%

[module/wlan]
type = internal/network
interface = wlan0
interval = 3.0

format-connected = <ramp-signal> <label-connected>
format-connected-underline = #9f78e1
label-connected = %essid%

format-disconnected =
;format-disconnected = <label-disconnected>
;format-disconnected-underline = ${self.format-connected-underline}
;label-disconnected = %ifname% disconnected
;label-disconnected-foreground = ${colors.foreground-alt}

ramp-signal-0 = 
ramp-signal-1 = 
ramp-signal-2 = 
ramp-signal-3 = 
ramp-signal-4 = 
ramp-signal-foreground = ${colors.foreground-alt}

[module/eth]
type = internal/network
interface = enp3s0f2
interval = 3.0

format-connected-underline = #55aa55
format-connected-prefix = " "
format-connected-prefix-foreground = ${colors.foreground-alt}
label-connected = %local_ip%

format-disconnected =
;format-disconnected = <label-disconnected>
;format-disconnected-underline = ${self.format-connected-underline}
;label-disconnected = %ifname% disconnected
;label-disconnected-foreground = ${colors.foreground-alt}

[module/date]
type = internal/date
interval = 5

date =
date-alt = " %m-%d-%Y"

time = %H:%M
time-alt = %H:%M:%S

format-prefix = 
format-prefix-foreground = ${colors.foreground-alt}
format-underline = #458588


label = %date% %time%

[module/pulseaudio]
type = internal/pulseaudio

format-volume = <label-volume> 
label-volume = 墳 %percentage%%
label-volume-foreground = ${root.foreground}
label-volume-font = 1

label-muted = ﱝ Muted
label-muted-foreground = #666

bar-volume-width = 10
bar-volume-foreground-0 = #55aa55
bar-volume-foreground-1 = #55aa55
bar-volume-foreground-2 = #55aa55
bar-volume-foreground-3 = #55aa55
bar-volume-foreground-4 = #55aa55
bar-volume-foreground-5 = #f5a70a
bar-volume-foreground-6 = #ff5555
bar-volume-gradient = false
bar-volume-indicator = |
bar-volume-indicator-font = 0
bar-volume-fill = ─
bar-volume-fill-font = 0
bar-volume-empty = ─
bar-volume-empty-font = 0
bar-volume-empty-foreground = ${colors.foreground-alt}

[module/alsa]
type = internal/alsa

format-volume = <label-volume> <bar-volume>
label-volume = VOL
label-volume-foreground = ${root.foreground}

format-muted-prefix = " "
format-muted-foreground = ${colors.foreground-alt}
label-muted = Muted

bar-volume-width = 10
bar-volume-foreground-0 = #55aa55
bar-volume-foreground-1 = #55aa55
bar-volume-foreground-2 = #55aa55
bar-volume-foreground-3 = #55aa55
bar-volume-foreground-4 = #55aa55
bar-volume-foreground-5 = #f5a70a
bar-volume-foreground-6 = #ff5555
bar-volume-gradient = false
bar-volume-indicator = |
bar-volume-indicator-font = 0
bar-volume-fill = ─
bar-volume-fill-font = 0
bar-volume-empty = ─
bar-volume-empty-font = 0
bar-volume-empty-foreground = ${colors.foreground-alt}

[module/battery]
type = internal/battery
battery = BAT0
adapter = AC0
full-at = 98

format-charging = <animation-charging> <label-charging>
;format-charging-underline = #ffb52a
format-charging-underline = #b8bb26

format-discharging = <animation-discharging> <label-discharging>
format-discharging-underline = ${self.format-charging-underline}

format-full-prefix = " "
format-full-prefix-foreground = ${colors.foreground-alt}
format-full-underline = ${self.format-charging-underline}

ramp-capacity-0 = 
ramp-capacity-1 = 
ramp-capacity-2 = 
ramp-capacity-foreground = ${colors.foreground-alt}

animation-charging-0 = 
animation-charging-1 = 
animation-charging-2 = 
animation-charging-foreground = ${colors.foreground-alt}
animation-charging-framerate = 750

animation-discharging-0 = 
animation-discharging-1 = 
animation-discharging-2 = 
animation-discharging-foreground = ${colors.foreground-alt}
animation-discharging-framerate = 750

[module/temperature]
type = internal/temperature
thermal-zone = 0
warn-temperature = 60

format = <ramp> <label>
format-underline = #f94732
format-warn = <ramp> <label-warn>
format-warn-underline = ${self.format-underline}

label = %temperature-c%
label-warn = %temperature-c%
label-warn-foreground = ${colors.secondary}

ramp-0 = 
ramp-1 = 
ramp-2 = 
ramp-foreground = ${colors.foreground-alt}

[module/powermenu]
type = custom/menu

expand-right = true

format-spacing = 1

label-open = 
label-open-foreground = ${colors.secondary}
label-close = Cancel
label-close-foreground = ${colors.secondary}
label-separator = 
label-separator-foreground = ${colors.foreground-alt}

menu-0-0 = Reboot
menu-0-0-exec = reboot
menu-0-1 = Power Off
menu-0-1-exec = poweroff


[settings]
screenchange-reload = true
;compositing-background = xor
;compositing-background = screen
;compositing-foreground = source
;compositing-border = over
pseudo-transparency = true

[global/wm]
margin-top = 0
margin-bottom = 0

; vim:ft=dosini
