<!-- INSTALL-Mac.md - Removable HEADER Start -->

Last edited: Mar 30, 2022

<!-- Removable HEADER End -->

## <a name="instl_mac_top"></a>Macintosh Install

> If NCID does not work, see [INSTALL](#instl_generic_top)
  for some simple tests.

> If you're using a gateway, review the appropriate section in
  [Gateways](#gateways_top).

> [Table of Contents](#doc_top)

### Sections:

> [SYSTEM REQUIREMENTS:](#instl_mac_sr)  
  [COMPILE/INSTALL/UPGRADE from Source:](#instl_mac_comp)  
  [INSTALL/UPGRADE using Install Script:](#instl_mac_iu)  
  [CONFIGURE:](#instl_mac_conf)  
  [FIRST STARTUP:](#instl_mac_fs)  
  [(AUTO)START/STOP:](#instl_mac_ss)  
  [CHECKING DAEMON STATUS:](#instl_mac_check)  
  [TRIMMING LOG FILES:](#instl_mac_trim)  

### <a name="instl_mac_sr"></a>SYSTEM REQUIREMENTS:

> #### macOS:

>>- NCID should work on macOS 10.9.5 (Mavericks) and later versions.
  It requires an Intel 64bit processor.

> #### Graphical User Interface (GUI):

>>- The native macOS GUI called **Aqua** is not compatible with the NCID GUI client. Instead, it needs **XQuartz**, a macOS specific version of **X Windows** (a.k.a. **X11**). **XQuartz** is installed as a separate application and runs alongside **Aqua**.

>>- In addition to **XQuartz**, a special version of TCL/TK is required that works
with **XQuartz**. The steps to install these depend on which package manager is used and are incorporated below.

> #### Package Manager:

>> Pick *one* of the following package managers (do not install both).

>>##### <u>*Homebrew*</u>
>>>- This is the preferred package manager because it appears to be more actively maintained, especially for the latest versions of macOS. Check [here](https://docs.brew.sh/Installation#macos-requirements) to see if you meet the minimum system requirements.
>>>
>>>- Click [here](https://homebrew.sh) for instructions to download and install Homebrew.
>>>
>>>- Click [here](https://www.xquartz.org/) for instructions to download and install **XQuartz**.
>>>- The special version of TCL/TK that integrates with **XQuartz** is provided by "R for macOS", an open source software package completely unrelated to NCID.
>>>- Click [here](https://cran.r-project.org/bin/macosx/) and download the **R-x.x.x.pkg** that is appropriate for your macOS version. For example, macOS 10.13 requires **R-4.1.0.pkg**.
>>>>- Double-click on the downloaded **R-x.x.x.pkg** file to start the installation.
>>>>- Click the buttons for *Continue* and *Agree* repeatedly but  stop when you get to the screen that says, "Standard install on....".
>>>>- Click *Customize* in the lower left.
>>>>- Leave the checkmark in front of "Tcl/Tk" but uncheck everything else.
>>>>- Click *Install* in the lower right and follow the prompts to completion.

>>##### <u>*MacPorts*</u>
>>>- You will likely use MacPorts for older versions of macOS that Homebrew no longer supports.  
>>>
>>>- File **/etc/paths** needs to be edited to put in directories for finding MacPorts.
 Use **sudo** to make a backup first, then edit the file with:
>>>
>>>
>>>             sudo vi /etc/paths
>>>
>>>
>>>>> so that it looks like this:
>>>>
>>>
>>>>
        /opt/local/libexec/gnubin  
        /opt/local/bin  
        /opt/local/sbin  
        /usr/bin  
        /bin  
        /usr/sbin  
        /sbin  
        /usr/local/bin  
        /usr/local/sbin  
>>>
>>>- Click [here](https://www.macports.org/install.php) for instructions to download and install MacPorts.

### <a name="instl_mac_comp"></a>COMPILE/INSTALL/UPGRADE from Source:

>* When building NCID from source, you *must* compile on a
  case-sensitive Mac filesystem.
  This requirement is ONLY for compiling NCID. Do not
  attempt to put other macOS applications on a
  case-sensitive filesystem because they will probably
  not work as expected.

>> Use the **diskutil** command to determine the filesystem type.
Assuming you will be installing to the Mac's startup
volume, i.e., the root filesystem, type the following:  
>
>          diskutil info / | fgrep -i "file system"

>>The default macOS filesystem type is 'Journaled HFS+'
 which is not case-sensitive.

>>Look for 'Case-sensitive' in the output of the **diskutil**
command above. If you don't see it, you can create
a small, case-sensitive disk image just so you can
compile NCID. A minimum 100 megabyte disk image
is recommended.
>
>          hdiutil create -size 100m \  
>                         -fs "Case-sensitive HFS+" \  
>                         -volname NCID ~/NCID.dmg  

>>Next, mount the disk image:
>
>          hdiutil attach ~/NCID.dmg

>>and change to its directory where you will place the source:
>
>          cd /Volumes/NCID

>* ##### <u>*Homebrew*</u>

>> Do not use **sudo** when executing **brew install**.

>> The following packages are required:
>
>          brew install icu4c libpcap libphonenumber pcre 
>          brew install make wget bwidget

>* ##### <u>*MacPorts*</u>

>> You must use **sudo** when executing **port install**.

>> The following packages are required:
>
>          sudo port install libpcap libphonenumber-cpp pcre 
>          sudo port install gmake tk +quartz wget bwidget

>* Download the source from SourceForge:  
>
>>
>
>          wget https://sourceforge.net/projects/ncid\
>                  /files/ncid/<version>/ncid-<version>-src.tar.gz


>>> Example:
>
>          wget https://sourceforge.net/projects/ncid\
>                  /files/ncid/1.12/ncid-1.12-src.tar.gz

>* Copy `ncid-<version>-src.tar.gz` to the Mac's case-sensitive filesystem and 
  then type:
>
>>
>
>          tar -xzvf ncid-<version>-src.tar.gz  
>  
>          cd ncid  
>  
>          make mac  
>  
>          sudo make mac-install  
                        

>* For both an install and an upgrade, existing configurations are automatically 
  preserved, but new ones installed will have .new as the extension. You will need to
  manually compare your current configuration files with the ".new" ones and manually
  edit any differences.

>* Optional gateways will require additional Perl packages before they can be run.
  Installing these with the native Perl package manager called **cpan**.

>>- This package is required to run email2ncid, obi2ncid, rn2ncid, wc2ncid, wct, and xdmf2ncid:

>          cpan install Config::Simple

>>- This additional package is required to run wc2ncid, wct and xdmf2ncid:

>          cpan install Data::HexDump

### <a name="instl_mac_iu"></a>INSTALL/UPGRADE using install script:

> ### NCID version 1.12 and later does not support an install/upgrade using an install script.

> ### NCID version 1.12 and later require library dependencies that can only be resolved by compiling from source.

> ### The information below is provided as historical reference.

> In the discussion below, `<version>` represents the NCID version number, `<os>` the macOS version number and `<pm>` the name of the package manager.

>* ##### <u>*Homebrew*</u>

>> Do not use **sudo** when executing **brew install**.

>> The following packages are required:
>
>          brew install icu4c libpcap libphonenumber pcre 
>          brew install make wget

>* ##### <u>*MacPorts*</u>

>> You must use **sudo** when executing **port install**.

>> The following packages are required:
>
>          sudo port install libpcap libphonenumber-cpp pcre 
>          sudo port install gmake tk +quartz wget

>* Download the installer script from SourceForge:  
>
>>
>
>          wget https://sourceforge.net/projects/ncid\
>                  /files/ncid/<version>\
>                  /ncid-<version>-macOS-<os>-x86_64-<pm>_install.sh

>>> Example:
>
>          wget https://sourceforge.net/projects/ncid\
>                  /files/ncid/1.12\
>                  /ncid-1.12-macOS-10.13.6-x86_64-Homebrew_install.sh

>* Execute the installer:
>
>>
>
>          sudo sh ncid-<version>-macOS-<os>-x86_64-<pm>_install.sh  
>
>>> Example:  
>  
>          sudo sh ncid-1.12-macOS-10.13.6-x86_64-Homebrew_install.sh

>           

>* For both an install and an upgrade, existing configurations are automatically 
  preserved, but new ones installed will have .new as the extension. You will need to
  manually compare your current configuration files with the ".new" ones and manually
  edit any differences.

>* Optional gateways will require additional Perl packages before they can be run.
  Installing these with the native Perl package manager called **cpan**.

>>- This package is required to run email2ncid, obi2ncid, rn2ncid, wc2ncid, wct, and xdmf2ncid:

>          cpan install Config::Simple

>>- This additional package is required to run wc2ncid, wct and xdmf2ncid:

>          cpan install Data::HexDump

                                
### <a name="instl_mac_conf"></a>CONFIGURE:

> The Makefile preconfigures ncidd.conf for the Mac, but you may
  want to change some of the defaults.

> - If you are using a gateway instead of a local modem,
    you need to set cidinput:  
>  
>>
>
>          set cidinput = 1 # Caller ID from a serial or USB device and optional gateways  
>          set cidinput = 2 # Caller ID from gateways with modem support  
>          set cidinput = 3 # Caller ID from gateways without modem support  

> - If you are using a local modem with or without a gateway:  
>  
>>
>
>          set cidinput = 0  (this is the default)  

### <a name="instl_mac_fs"></a>FIRST STARTUP:

> NCID requires the server and at least one client to function. The
  server is required on one computer or device, but the client can be
  installed on as many computers as needed.

> - If you are running the server and client on the same computer
    and using a modem:  
>  
>>
>
>          sudo /usr/local/sbin/ncidd  
>  
>> In Finder, navigate to the Applications folder and double-click on **ncid-gui** (or **ncid-gui.command**). Close the front Terminal window that says, "Completed Command" in the title bar.
>
> - If you are running the server and using a gateway:  
>  
>>
>
>          sudo /usr/local/sbin/ncidd  
>  
>          sudo /usr/local/sbin/<name of gateway>  
>  
>> In Finder, navigate to the Applications folder and double-click on **ncid-gui** (or **ncid-gui.command**). Close the front Terminal window that says, "Completed Command" in the title bar.

> - Call yourself and see if it works. If not, stop the gateway first (if used) and then 
> stop the server, using **sudo kill** and the appropriate process ID. Continue by
> reading the test sections.

> - If everything is OK, enable the NCID server, gateways and client modules you are
>  using to autostart at boot.

### <a name="instl_mac_ss"></a>(AUTO)START/STOP:
              
> #### SERVER:
    
>> Under macOS the mechanism used to start the NCID
   server processes is **launchd** and requires **.plist** files in
   /Library/LaunchDaemons. The naming convention used is as follows:

>>
>
>          /Library/LaunchDaemons/net.sourceforge.ncid-{name}.plist  
   
>> Appropriate **.plist** files for the NCID server processes are created 
   automatically when NCID is installed, however, they must be manually
   activated.
    
>> Once activated, no action is typically required as the **.plist** files are 
   configured to automatically start each time the system boots.

>> You do not interact with **launchd** directly, instead you use the **launchctl**
   command line utility.

>> You should only activate the NCID servers, gateways and client modules you need. 
   Activating will also start the process immediately; there is no need
   to reboot.

>> The syntax for stopping the daemons is the same as starting them, except
   you use the *unload* subcommand instead of the *load* subcommand. Doing an *unload*
   stops the daemon immediately and prevents it from starting automatically
   the next time the system is booted.
    
>> Here are some examples:

>> - Start the NCID server:
>  
>          sudo launchctl load -w \
>               /Library/LaunchDaemons/net.sourceforge.ncidd.plist  

>> - Stop the sip2ncid server:
>  
>          sudo launchctl unload -w \
>               /Library/LaunchDaemons/net.sourceforge.sip2ncid.plist  

>> - Start ncid with ncid-page:
>  
>          sudo launchctl load -w \
>               /Library/LaunchDaemons/net.sourceforge.ncid-page.plist  

>> Review the man page: **man launchctl**

> #### CLIENT:
    
>> For the NCID GUI client, no **.plist** is currently provided because of the 
   requirement that NCID must be installed as root and the GUI preference file
   is specific to each user.

>> However, a script called **ncid-gui** (or **ncid-gui.command**) is installed
   for you automatically to the Applications folder.

>> To have it start when you 
   automatically log in, drag **ncid-gui** (or **ncid-gui.command**) to your account's Login Items as
   described [here](https://web.archive.org/web/20170901062904/https://support.apple.com/en-us/HT2602).
    
>> After you login, you should close the front Terminal window that says, 
    "Completed Command" in the title bar.
        
### <a name="instl_mac_check"></a>CHECKING DAEMON STATUS:

> Use the **launchctl** *list* subcommand to show the daemons currently loaded, 
  optionally using **fgrep** to filter out only NCID related processes.
    
> Daemons currently running will have a process id.
    
> Daemons which were stopped without an error will not be listed at all.
    
> If a daemon has stopped due to an error, it will have no process id but 
  will have a numeric exit status. Examine the contents of the
  /var/log/system.log file to determine the problem. Once you fix the 
  problem, use the **launchctl** *unload* subcommand followed by the *load* subcommand.

> Example:  
>  
>          sudo launchctl list|fgrep net.sourceforge.ncid  
>  
>          PID     Status  Label  
>          422     -       net.sourceforge.ncid-notify  
>          419     -       net.sourceforge.ncidd  

### <a name="instl_mac_trim"></a>TRIMMING LOG FILES:

> The Mac uses **newsyslog** to trim files. To trim the cidcall.log and the
  ciddata.log files, add this entry to /etc/newsyslog.conf
>  
>          /var/log/cid*.log   root:wheel 644 5 * $M1D0 GN
