<!-- INSTALL-Fedora.md - Removable HEADER Start -->

Last edited: Mar 30, 2022

<!-- Removable HEADER End -->

## <a name="instl_fed_top"></a>Fedora RPM Package Install

> If NCID does not work, see [INSTALL](#instl_generic_top) for some simple tests.  

> If you're using a gateway, review the appropriate section in [Gateways](#gateways_top).

> [Table of Contents](#doc_top)

### Sections:

> [COMPILE/INSTALL from Source:](#instl_fed_comp)  
  [INSTALL/UPGRADE from RPM Package:](#instl_fed_iu)  
  [CONFIGURE:](#instl_fed_conf)  
  [FIRST STARTUP:](#instl_fed_fs)  
  [START/STOP/RESTART/RELOAD/STATUS:](#instl_fed_ss)  
  [AUTOSTART:](#instl_fed_as)

### <a name="instl_fed_comp"></a>COMPILE/INSTALL from Source:

> **Compile using the ncid-&lt;NCID version&gt;-src.tar.gz tar archive:**

>> The following packages are required:

>          sudo dnf install libpcap-devel pcre-devel tcl  
>          sudo dnf install libphonenumber-devel libicu-devel 
>          sudo dnf install protobuf-devel

>> These packages are required to run the ncid GUI:  
>>  (note that package tk also installs package tcl)

>          sudo dnf install tk bwidget

>> This Python3 package is required to run phonetz, used by ncidd

>          sudo dnf install python3-phonenumbers

>> This Perl package is required to run email2ncid, obi2ncid, rn2ncid, wc2ncid, wct, and xdmf2ncid:

>          sudo dnf install perl-Config-Simple

>> This additional Perl package is required to run wc2ncid, wct and xdmf2ncid:

>          sudo dnf install perl-Data-HexDump

>> If the above Perl packages are not in the repository, you can try installing with
  the native Perl package manager called **cpan**:

>          cpan install Config::Simple
>          cpan install Data::HexDump
> 
>> Finally, compile and install:

>          make fedora
>          sudo make fedora-install

> **Rebuild the rpm packages using ncid-&lt;NCID version&gt;.fc&lt;OS version&gt;.src.rpm**

>>  Install the required packages

>          dnf builddep ncid-<NCID version>.fc<OS version>.src.rpm

>> Rebuild the RPM packages

>          rpm --rebuild ncid-<NCID version>.fc<OS version>.src.rpm


### <a name="instl_fed_iu"></a>INSTALL/UPGRADE from RPM Package:

> NCID requires the server and client RPM packages to function.  The
  server is required on one computer or device, but the client can be
  installed on as many computers as needed.

> The client has most of the output modules in its RPM package, but there
  are optional output modules in their own RPM packages.

> Download the server and client RPM packages using dnf from the
  Fedora repositories.  You can also download any optional output
  modules you want.

> - List the available packages:  
>  
>          sudo dnf list ncid\*

> - The most recent versions may be here:  
>  
>          sudo dnf install fedora-release-rawhide  
>          sudo dnf --enablerepo=rawhide list ncid\*  

> - Install the server package (required):  
>  
>          sudo dnf install ncid-< rpm package >  

> - Install the client package (optional)

>          sudo dnf install ncid-client-< rpm package >

> - Install the gateways package if using a gateway instead of a modem (optional):  
>  
>          sudo dnf install ncid-gateways-< rpm package >

> - Install any optional module packages wanted
    (most modules are included with the client package):  
>  
>          sudo dnf install ncid-< module rpm package >  

> If the current release is not in the Fedora repositories, download
  the RPM packages from https://sourceforge.net/projects/ncid/

> - Download server, gateways and client RPM Packages from SourceForge:  
>  
>          ncid RPM Package          (server - required)  
>          ncid-client RPM Package   (client & default output modules - optional)  
>          ncid-gateways RPM Package (gateways - optional)  

> - Download any optional output modules wanted from SourceForge:
>  
>          ncid-MODULE RPM Package  (optional client output modules)  

> - Install or Upgrade the packages:

>> -         Using the file viewer:  
>>
>>        - Open the file viewer to view the NCID RPM packages  
>>        - Select the RPM packages  
>>        - Right click selections and select "Open with Package installer"  
>>
>> -         Using dnf:  
>>
>          sudo dnf install ncid\*.rpm

### <a name="instl_fed_conf"></a>CONFIGURE:

> The ncidd.conf file is used to configure ncidd.

> - The default modem port in ncidd is /dev/ACM0.  If you need to change it,
    set your modem port in ncidd.conf.  This assumes serial port 0:  
>  
>          set ttyport = /dev/ttyS0  
>  
> - If you are using a Gateway to get the Caller ID instead of a
    local modem, you need to set cidinput:  
>  
>          set cidinput = 1 # Caller ID from a serial or USB device and optional gateways  
>          set cidinput = 2 # Caller ID from gateways with modem support
>          set cidinput = 3 # Caller ID from gateways without modem support  

> - If you are using a local modem with or without a Gateway:  
>  
>          set cidinput = 0  (this is the default)  

### <a name="instl_fed_fs"></a>FIRST STARTUP:

> - If you are running the server and client on the same computer
    and using a modem:  
>  
>          sudo systemctl start ncidd  
>  
>          ncid &

> - If you are running the server and using a gateway:  
>  
>          sudo systemctl start ncidd <name of gateway>  
>  
>          ncid &
          
> - Call yourself and see if it works, if not,

>> stop the gateway and server:  
>  
>>          sudo systemctl stop <name of gateway> ncidd  

>> and continue reading the test sections.

> - If everything is OK, enable the NCID server, gateways and
    client modules you are using to autostart at boot.  

>> For example, to start ncidd and sip2ncid at boot:  
>  
>>          sudo systemctl enable ncidd sip2ncid  

>> The GUI ncid client must be started after login, not boot.

>> NOTE:  

>>> The ncid client normally starts in the GUI mode and there is no
    ncid.service script to start or stop it.  There are
    service scripts for starting ncid with output modules,
    for example: ncid-page, ncid-kpopup, etc.

### <a name="instl_fed_ss"></a>START/STOP/RESTART/RELOAD/STATUS:

> Use the 'systemctl' command to control any of the daemons.  The service
  commands are: start, stop, restart, reload, reload-or-restart and status.
  The client can also be started using the output module name instead
  of ncid.  All output modules can be run at the same time.

> Here are some examples:  

> - Start the NCID server:  
>  
>          sudo systemctl start ncidd.service  

> - Stop the sip2ncid server:  
>  
>          sudo systemctl stop sip2ncid.service  

> - Reload the server alias file:  
>  
>          sudo systemctl reload-or-restart ncidd.service  

> - Restart ncid using ncid-page:  
>  
>          sudo systemctl start ncid-page.service  

> - Get the status of ncid using ncid-speak:  
>  
>          sudo systemctl status ncid-speak.service  

> Review the man page: **man systemctl**

### <a name="instl_fed_as"></a>AUTOSTART:

> Use the 'systemctl' command to enable/disable a service to start at boot.

> Here are some examples:  

> - Autostart ncidd at boot:  
>  
>          sudo systemctl enable ncidd  

> - Autostart ncidd and sip2ncid at boot:  
>  
>          sudo systemctl enable ncidd sip2ncid  

> - Disable ncid-speak from starting at boot:
>  
>          sudo systemctl disable ncid-speak  

> Review the man page: **man systemctl**
