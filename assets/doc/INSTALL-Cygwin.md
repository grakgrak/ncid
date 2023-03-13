<!-- INSTALL-Cygwin.md - Removable HEADER Start -->

Last edited: Dec 4, 2021

<!-- Removable HEADER End -->

## <a name="instl_cygwin_top"></a>Cygwin Package Install

### NCID version 1.12 and later do not support Cygwin.

### NCID version 1.12 and later requires libphonenumber which is not part of the Cygwin distribution.

### The Cygwin information below is provided as historical reference.

> If NCID does not work, see [INSTALL](#instl_generic_top) for some simple tests.

> If you're using a gateway, review the appropriate section in [Gateways](#gateways_top).

> [Table of Contents](#doc_top)


### Sections:
> [NOTES](#instl_cygwin_note)  
  [INSTALL](#instl_cygwin_inst)  
  [CONFIGURE](#instl_cygwin_conf)  
  [START](#instl_cygwin_st)  
  [REBASE](#instl_cygwin_reb)  
  [RUN AS A QUASI-SERVICE](#instl_cygwin_run)  

### <a name="instl_cygwin_note"></a>NOTES:

> The NCID server cannot directly control a modem under Cygwin. Use the supplied
> [yac2ncid](#gateways_yac) gateway to control a modem under Windows.

> The sip2ncid gateway is not part of the NCID install package.  It uses a network library not supported by Cygwin.

> The server must be configured in `ncidd.conf` for either:

> - cidinput = 1 # Caller ID from a serial or USB device and optional gateways

> - cidinput = 2 # Caller ID from gateways with modem support

> - cidinput = 3 # Caller ID from gateways without modem support

> In a normal Unix installation, the ncid client script will automatically 
> run in GUI mode under X-Windows. However, X-Windows is not available for 
> Cygwin. Two ncid client options are available:

> - Use the ncid client script in character mode under Cygwin:  
>  
>          ncid --no-gui &

>>  This also allows the use of output modules:  
>  
>            ncid --no-gui <module> &
>       
> - Download the ncid client Windows installer from SourceForge:  

>           ncid-VERSION-client_windows_setup.exe  

>> This does run in GUI mode but does not allow the use of output modules.

### <a name="instl_cygwin_inst"></a>INSTALL:

> #### Install Cygwin from http://cygwin.com/

> - download `setup-x86.exe`
> - run `setup-x86.exe`
> - select cygwin download site (we used US site http://cygwin.osuosl.org)
> - add the following to the default install setup

>> - Devel/gcc-core
>> - Devel gcc-g++
>> - Devel/make
>> - Editors/vim
>> - Interpreters/perl
>> - Interpreters/perl_pods
>> - Interpreters/tcl
>> - Net/openssh
>> - text/pcre
>> - Libs/libpcre-devel

> - it is strongly recommended you enable cut and paste in the Cygwin window

>> - Left click on the icon in upper left
>> - Select Properties
>> - Check *QuickEdit Mode* in Edit Options

> - if compiling from source:

>> - Download WinPcap Developer's Pack from https://www.winpcap.org/devel.htm
>> - Unzip WpdPack_&lt;version&gt;.zip
>> - Rename to WpdPack and move it to \\

> #### Install or upgrade NCID:

>> The NCID package normally installs in `/usr/local`:

>> - Install or upgrade using the tar archive, if available:

>>> - Extracting the tar file will REPLACE the contents of all of
   the NCID configuration files. Be sure to back them up first.
   This includes all files in `/usr/local/etc/ncid/`.

>>> - Copy `ncid-VERSION-cygwin.tgz` to your Cygwin home directory.
>>> - Extract:  
>>>
>>>            sudo tar -xzvf ncid-VERSION-cygwin.tgz -C /
>>> 
>>>> Example:  
>>>
>>>              sudo tar -xzvf ncid-1.12-cygwin.tgz -C /

>> - Install or upgrade using the install script, if available.

>>> - For an upgrade, the install script will preserve existing configurations and
   new ones installed will have *.new as the extension.
>>
>>> - Copy `ncid-VERSION-cygwin_install.sh` to your Cygwin home directory.
>>> - Run install script:
>>>       sudo sh ncid-VERSION-cygwin_install.sh

>>>> Example:  
>>>
>>>             sudo sh ncid-1.12-cygwin_install.sh
 
>> - If there is no binary package, you need to compile from source:
>>
>>> - Copy `ncid-VERSION-src.tar.gz` to your Cygwin home directory.

>>> - Extract and compile. It will be installed to `/usr/local` (see top of Makefile):  
>>>  
>>>           tar -xzvf ncid-VERSION-src.tar.gz  
>>>  
>>>           cd ncid  
>>>  
>>>           make cygwin  
>>>  
>>>           sudo make cygwin-install  

> #### If your phone system is VoIP and you want to use sip2ncid:

> - nothing else to do

> #### If you want to use a modem, you need YAC

> - download and install [YAC (on the Wayback Machine)](https://web.archive.org/web/20160824011700/http://www.sunflowerhead.com/software/yac/)
> - configure the YAC server for a listener at localhost (127.0.0.1)

### <a name="instl_cygwin_conf"></a>CONFIGURE:

> The Makefile configures `ncidd.conf` for Cygwin, but you may
   want to change some of the defaults.

> You need to configure sip2ncid to use the Network Interface.
   To find out the network interface name, you need to use the "-l"
   option to sip2ncid.  You should see your Network interface names
   listed.  Select the active one and use it with the "-i" option to
   sip2ncid.

### <a name="instl_cygwin_st"></a>START:

> If this is your first time, you should first do
  the [Test Using a Gateway](#instl_generic_gw)
  and specify `sip2ncid` or `yac2ncid`.

> Once testing is finished, run the processes in background:
>  
>          ncidd &
>          <name of gateway> &  
>          ncid --no-gui &

> Call yourself and see if it works.

### <a name="instl_cygwin_reb"></a>REBASE:

> One of the idiosyncrasies of Cygwin is the need to rebase the dll's
  (set a base dll load address) so they don't conflict and create
  forking errors. The easiest way to do this is documented at
  [Rebaseall](http://cygwin.wikia.com/wiki/Rebaseall).

> Just start an ash or dash prompt from `\\cygwin\\bin` and then type:
>  
>          rebaseall -v  
>          exit
		
### <a name="instl_cygwin_run"></a>RUN AS A QUASI-SERVICE:

> - Don't do this process until you have ncidd and sip2ncid or other processes
    running properly. Once you have things setup though, you can set ncidd and
    sip2ncid to (sort of) run as a service in Windows. I only say "sort of"
    because it's not technically a service, but is called from another
    Cygwin component that is a service.
	  
> - Re-run the `setup.exe` that you used to install Cygwin and install the
    cygrunsrv package. It's under Admin.

> - Go to a cygwin command line and type the following to install ncidd as a
    service:
>  
>          cygrunsrv -I ncidd -n -p /usr/local/bin/ncidd \
>                    -f "Network CallerID daemon(ncidd)" -a -D
		 
>> Explaining these parameters:
>>  
>>          -I indicates install  
>>  
>>          -n indicates that the service never exits by itself (I don't  
>>             recall why this has to be set, but it doesn't work otherwise)  
>>  
>>          -p /usr/local/bin/ncidd:  
>>             Application path which is run as a service.
>>  
>>          -f "Network CallerID daemon (ncidd)":  
>>             Optional string which contains  the service description  
>>             (the desc you see in the Services listing)  
>>  
>>          -a -D: passes the parameter "-D" to the ncidd program so it  
>>             runs in debug mode. This keeps ncidd running in the  
>>             "foreground" of the  cygrunsrv process.  
		 
> - Likewise, to remove the ncidd service:  
>  
>          cygrunsrv -R ncidd
		
> - To install sip2ncid to run in the background, the command line is similar:  
>  
>          cygrunsrv -I sip2ncid -n -p /usr/local/bin/sip2ncid -y ncidd \  
>                    -a '-i "/Device/NPF_{XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX}" \
>                    -D' -f "Service picks network SIP packets and sends to ncidd" \  
>                    --termsig KILL  
		
>> Explaining these parameters:
>>  
>>          -I indicates install
>>  
>>          -n indicates that the service never exits by itself (I don't  
>>             recall why this has to be set, but it doesn't work otherwise)  
>>  
>>          -p /usr/local/bin/sip2ncid: Application path which is run as  
>>             a service.  
>>  
>>          -y ncidd: adds a service dependency with the ncidd service so  
>>             that the ncidd service gets started automatically when you  
>>             start sip2ncid  
>>  
>>          -a '-i "/Device/NPF_{XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX}" -D':  
>>             note the single and double quotes in this section. You need to  
>>             replace XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX in the above  
>>             with NETWORK_INTERFACE from way above. To be clear, you want to  
>>             replace /Device/NPF_{XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX}  
>>             with NETWORK_INTERFACE from way above.
>>  
>>          -f "Service to pick SIP packets from network and send to ncidd":  
>>             Optional string which contains the service description  
>>             (the desc you see in the Services listing)  
>>  
>>          --termsig KILL: termination signal to send. If you don't include  
>>             this the service doesn't always get stopped.  

> - Likewise, to remove the sip2ncid service:  
>  
>          cygrunsrv -R sip2ncid

> - To install ncid-notify to run in the background, the command
	  line is similar:
>  
>          cygrunsrv -I ncid-notify -p /bin/sh.exe -a \  
>                    '-c "/usr/local/bin/ncid --no-gui --module ncid-notify"' \
>                    -f "Service to use notify service to send ncid messages to iPad"
		
>> Explaining these parameters:
>>  
>>          -I indicates install  
>>  
>>          -p /bin/sh.exe: Application path to run, which in this case is 
>>             just sh.exe because ncid-notify is a shell script  
>>  
>>          -a '-c "/usr/local/bin/ncid --no-gui  --module ncid-notify"'  
>>              these are the parameters that get sent to sh.exe:
>>
>>              -c "/usr/local/bin/ncid: this is the path to the ncid script
>>
>>              --no-gui: tells ncid not to run as gui
>>
>>              --module ncid-notify: tells ncid to pass data to "ncid-notify"
>>
>>          -f "Service to use notify service to send ncid messages to iPad":  
>>              Optional string which contains the service description  
>>              (the desc you see in the Services listing)  
>>
>>          -y ncidd: you COULD also add this line to add a service dependency  
>>             with the ncidd service so that the ncidd service gets started
>>             automatically when you start ncid-notify. I don't do this,
>>             because strictly speaking, you could be running ncidd on a
>>             different computer
			 
> - Likewise, to remove the ncid-notify service:
>  
>          cygrunsrv -R ncid-notify
