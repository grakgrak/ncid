<!-- INSTALL-Win.md - Removable HEADER Start -->

Last edited: Jun 4, 2019

<!-- Removable HEADER End -->

## <a name="instl_win_top"></a>Windows Install

> Install either the Windows client package or the complete package.

> [Table of Contents](#doc_top)

<!--
[### Sections:]
-->

### Sections:

<!--
Note: Do not change the version# in "(NCID version 1.7 and newer)" to be
the latest version. The version# must remain 1.7 to distinguish it from
the "(NCID version 1.6 and older)" instructions.
-->

> [WINDOWS CLIENT-ONLY INSTALL (NCID version 1.7 and newer):](#instl_win_client)

> > [Requirements](#instl_requirements)  
> > [Typical Install](#instl_win_client_tcl)  
> > [Minimal Install](#instl_win_client_tcl_min)  
> > [Upgrade](#upgrade_win_client_tcl)  
> > [Autostart at Login](#instl_win_client_auto)  
> > [Specifying command-line arguments and options](#instl_win_client_arg)

> [WINDOWS CLIENT-ONLY INSTALL (NCID version 1.6 and older):](#instl_freewrap_win_client)

> > [Requirements](#instl_freewrap_requirements)  
> > [Install ncid.exe](#instl_freewrap_win_client_exe)

> [WINDOWS CYGWIN COMPLETE INSTALL:](#instl_win_cygwin)

> [WINDOWS 10 COMPLETE INSTALL:](#instl_win_10)

<!--
[### WINDOWS CLIENT-ONLY INSTALL (NCID version 1.7 and newer):]
-->

<!--
Note: Do not change the version# in "(NCID version 1.7 and newer)" to be
the latest version. The version# must remain 1.7 to distinguish it from
the "(NCID version 1.6 and older)" instructions.
-->

### <a name="instl_win_client"></a>WINDOWS CLIENT-ONLY INSTALL (NCID version 1.7 and newer):

<!--
[#### Requirements]
-->

> #### <a name="instl_requirements"></a>Requirements

<!--
Note: Do not change the version# in "(NCID version 1.7 and newer)" to be
the latest version. The version# must remain 1.7 to distinguish it from
the "(NCID version 1.6 and older)" instructions.
-->

> - Windows client version 1.7 and newer

> - [NCID](http://ncid.sourceforge.net/ncid/ncid.html) server

> - ActiveTcl-8.6.9 and newer

> > - Go to the [ActiveTcl download page](http://aspn.activestate.com/ASPN/Downloads/ActiveTcl/)

> > - Scroll down to **DOWNLOAD TCL: OTHER PLATFORMS AND VERSIONS**.
> > - Click on the latest version of the **Windows-Installer (EXE)** to

     begin downloading.

> > - Run the installer downloaded:
>
> > >          ActiveTcl?.?.?.?.?-MSWin32-64-x64-?.exe
>
> > - Accept all defaults. It is safe to ignore the two warnings

     highlighted in yellow that begin with the phrase, "For a personal
     installation we assume...."

<!--
[#### Typical Install]
-->

> #### <a name="instl_win_client_tcl"></a>Typical Install

> - Download "ncid-VERSION-client_windows_setup.exe" from [SourceForge](https://sourceforge.net/projects/ncid/files/ncid/).

> - Run the installer:

> > - Decide if you want a desktop link (default).

> > - Decide if you want a startup link (optional; can be added manually after installation).

> > - Accept defaults for all other prompts until you get to the server address.

> > - Change the server address if different from the default shown.

> > > Examples:
> > >
> > >          192.168.22.10

> > >          ncid.sourceforge.net

> > - The default installation folder is:
> >
> > >          C:\NCID Universal Client

> - File ncid.conf will be located in the same folder as ncid.tcl. Feel free to edit this file and change options as desired.

<!--
[#### Minimal Install]
-->

> #### <a name="instl_win_client_tcl_min"></a>Minimal Install

> - Once the ActiveState TCL/TK interpreter is installed, which files you need
>   will depend on how you want to run the client:

> > - Windows Command Prompt: only ncid.tcl is required. You can use ncid.conf if desired.

> > - Windows Explorer: only ncid.tcl and ncid.conf are required. A complete
> >   ncid.conf file is recommended, however, you can also use a text editor to
> >   manually create ncid.conf consisting of a single line:
>
> > >          set Host <IP address or hostname>

> - If used, ncid.conf must be in the same directory as ncid.tcl.

> - Somehow you need to extract the above file(s) after downloading "ncid-?-client_windows_setup.exe"
>   from SourceForge. You can either use a program like [7-Zip](http://www.7-zip.org/download.html),
>   or perform the [Typical Install](#instl_win_client_tcl) and copy ncid.tcl and ncid.conf
>   elsewhere.

> - To run the client from the Windows Command Prompt, simply type ncid.tcl followed by
>   [command-line arguments and options](#instl_win_client_arg). No Windows shortcut is needed.

> - To run ncid.tcl from Windows Explorer, make sure ncid.conf has a correct "set Host" line, then
>   double-click on ncid.tcl.

<!--
[#### Upgrade]
-->

> #### <a name="upgrade_win_client_tcl"></a>Upgrade

> - Install the latest ncid client for windows and it will replace the old version.

> > If an existing ncid.conf is detected it will be preserved; the one for the new version will be called ncid.newconf.

> - Install the latest ActiveTcl version, must be version 8.6.9 and newer.

<!--
[#### Autostart at Login]
-->

> #### <a name="instl_win_client_auto"></a>Autostart at Login

> > These steps assume you have done the [Typical Install](#instl_win_client_tcl).

> > You can make ncid autostart at login by simply copying the ncid
> > shortcut from the desktop to your Startup folder.
> > Follow these steps:

> > 1.  Find the newly-installed ncid shortcut (icon) on the desktop.
> > 1.  Right-click on it and choose Copy.
> > 1.  Click on Start and choose All Programs.
> > 1.  Scroll until you find the folder called Startup.
> > 1.  Right-click on Startup and choose Open.
> > 1.  Paste the shortcut with ctrl-v, or in the menu bar choose Edit->Paste.

<!--
[#### Specifying command-line arguments and options]
-->

> #### <a name="instl_win_client_arg"></a>Specifying command-line arguments and options

> > Command-line arguments and options can be added to a shortcut. The install package
> > creates a desktop shortcut that contains the server address argument, for example:
>
> >          C:\ncid\ncid.tcl 192.168.22.10

> > The default port number is 3333 but it can also be changed in the shortcut.
> > number if it is different from the default of 3333. Right-click on
> > the shortcut, choose Properties, then add a space followed by the
> > port number, for example:
>
> >          C:\ncid\ncid.tcl 192.168.22.10 3334

> > Adding options requires they be specified before the server's
> > IP address or hostname.

> > You should add two hyphens (--) right
> > after ncid.tcl so that the TCL/TK interpreter does not confuse options
> > intended for itself and those intended for ncid.

> > You can mix short and long options.

> > Example:
>
> >          C:\ncid\ncid.tcl -- -D 120 --ring 5 -X -H 192.168.22.10 3334

> > Supported options:
>
>               --alt-date,                  -A
>               --delay <seconds>,           -D <seconds>
>               --hostname-flag,             -H
>               --noexit,                    -X
>               --PopupTime <1-99 seconds>,  -t <1-99 seconds>
>               --ring <0-9|-1|-2|-3|-4|-9>, -r <0-9|-1|-2|-3|-4|-9>

> > Unsupported options:
>
>               --no-gui
>               --pidfile, -p <file>
>               --module, -P <module name>
>               --verbose, -v <1-9>
>               --version, -V
>               --wakeup,  -W

<!--
[### WINDOWS CLIENT-ONLY INSTALL (NCID version 1.6 and older):]
-->

### <a name="instl_freewrap_win_client"></a>WINDOWS CLIENT-ONLY INSTALL (NCID version 1.6 and older):

<!--
[#### Requirements]
-->

> #### <a name="instl_freewrap_requirements"></a>Requirements

> - Windows client version 1.6 and older

> - [NCID](http://ncid.sourceforge.net/ncid/ncid.html) server

<!--
[#### Install ncid.exe (deprecated, uses FreeWrap)]ncid.exe (deprecated, uses FreeWrap)
-->

> #### <a name="instl_freewrap_win_client_exe"></a>Install ncid.exe (deprecated, uses FreeWrap)

> > The following steps have been deprecated but are being kept for
> > historical purposes. This older Windows client is still available for
> > download from SourceForge for NCID versions 1.6 and older.

> > The older version used [freeWrap](http://freewrap.sourceforge.net/) to
> > bundle the ncid client script and the needed TCL/TK interpreter. This
> > resulted in a simple, stand-alone executable. Unfortunately, it had a
> > technical limitation where the ncid.conf file could not be edited.
> > Although it was still possible to specify command line arguments via
> > the Windows shortcut, not all ncid.conf settings had command line
> > equivalents, which meant their default settings could not be changed.
> > This issue has been eliminated in the current windows install.

> > Here then are the Windows client instructions for NCID version 1.6 and
> > older....

> > - Execute the ncid installer:

> > > - NCID Versions 1.4 and older:
> > >
> > >               ncid-VERSION-client_setup.exe
> > >
> > > - NCID Versions 1.5 and newer:
> > >
> > >               ncid-VERSION-client_win10_x64_setup.exe

> > > Examples:
> > >
> > >                 ncid-1.0-client_setup.exe
> > >
> > >                    ncid-1.6-client_win10_x64_setup.exe

> > - You'll be asked for the NCID server address. The default is

    127.0.0.1, so you will need to change it.

> > > Examples:
> > >
> > >                 192.168.22.10
> > >
> > >                 ncid.sourceforge.net

<!--
[### WINDOWS CYGWIN COMPLETE INSTALL:]
-->

### <a name="instl_win_cygwin"></a>WINDOWS CYGWIN COMPLETE INSTALL:

> See [INSTALL-Cygwin](#instl_cygwin_top) if you want to install the
> complete NCID package including server, client and gateways.

> NCID under Cygwin is a fairly complex command line install and there
> are some performance issues with it.

> It is unknown if the serial port functions of ncidd will work under
> Cygwin; the solution would be to use the SIP or YAC gateway.

<!--
[### WINDOWS 10 COMPLETE INSTALL:]
-->

### <a name="instl_win_10"></a>WINDOWS 10 COMPLETE INSTALL:

> Windows 10's Anniversary Update brings a "Bash on Ubuntu on Windows" environment to Windows 10.
> The Windows Subsystem for Linux allows you to run Linux applications directly on Windows.
> It's a full compatibility layer for running Linux applications on Windows.

> These three links explain how to enable the the Win10 beta subsystem for Linux and usage:

> > [How to Install and Use the Linux Bash Shell on Windows 10](https://www.howtogeek.com/249966/how-to-install-and-use-the-linux-bash-shell-on-windows-10/)

> > [Everything You Can Do With Windows 10's New Bash Shell](https://www.howtogeek.com/265900/everything-you-can-do-with-windows-10s-new-bash-shell/)

> > [How to run the native Ubuntu desktop on Windows 10](http://www.zdnet.com/article/how-to-run-run-the-native-ubuntu-desktop-on-windows-10/)

> The last link tells how to set up Linux to run programs using the x-server. Be sure to
> start and configure Xming XLaunch (accepting defaults OK). You do not need to install
> the desktop and instead can start programs using bash.

> After you **Xming** and **Bash on Ubuntu on Windows**, you can install NCID using the
> [INSTALL-Ubuntu](http://ncid.sourceforge.net/doc/NCID-UserManual.html#instl_ubuntu_top)
> section in the [NCID User Manual](http://ncid.sourceforge.net/doc/NCID-UserManual.html)

> Be warned, you are trail blazing. The ncid packages were not tested.
