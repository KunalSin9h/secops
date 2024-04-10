cmake_minimum_required(VERSION 3.0)
project(RunScript)

if(UNIX AND NOT APPLE)
  file(READ "/etc/os-release" OS_RELEASE)

  string(REGEX MATCH "ID=([A-Za-z]*)" LINUX_ID_MATCH "${OS_RELEASE}")
  set(LINUX_ID "${CMAKE_MATCH_1}")

  if(NOT LINUX_ID)
    string(REGEX MATCH "ID_LIKE=([A-Za-z]*)" LINUX_ID_LIKE_MATCH "${OS_RELEASE}")
    set(LINUX_ID "${CMAKE_MATCH_1}")
  endif()

  if(LINUX_ID STREQUAL "")
    message(WARNING "Could not identify Linux distribution. Adapting as much as possible.")
    set(DISTRO "Unknown Linux Distribution")
  else()
    if(LINUX_ID STREQUAL "arch")
      message(STATUS "Detected Arch Linux")
      set(DISTRO "Arch Linux")
      add_custom_target(run_script
	      COMMAND  sudo pacman -S --needed  base-devel  curl wget  file openssl  gtk3 patchelf libappindicator-gtk3  librsvg -y  webkit2gtk 
	      COMMENT "Running script on Arch Linux"
      )
    elseif(LINUX_ID STREQUAL "debian")
      message(STATUS "Detected Debian Linux")
      set(DISTRO "Debian Linux")
	      add_custom_target(run_script
	      COMMAND   sudo apt-get install libwebkit2gtk-4.0-dev build-essential  curl wget file  libssl-dev  libgtk-3-dev  patchelf  libappindicator3-dev  librsvg2-dev -y
	      COMMENT "Running script on Debian Linux"
      )

    else()
      message(STATUS "Detected ${LINUX_ID}-like Linux distribution")
      set(DISTRO "${LINUX_ID}-like Linux")
    endif()
  endif()


else()
  message(FATAL_ERROR "This CMake script is designed for Linux systems only.")
endif()
