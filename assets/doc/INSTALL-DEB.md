<!-- INSTALL-DEB.md - Removable HEADER Start -->

Last edited: Apr 28, 2022

<!-- Removable HEADER End -->

## <a name="instl_deb_top"></a>DEB Package Install for Debian, Raspbian and Ubuntu

> May be valid for other DEB Operating Systems

> If NCID does not work, see [INSTALL](#instl_generic_top) for some simple tests.  

> If you're using a gateway, review the appropriate section in [Gateways](#gateways_top).

[Table of Contents](#doc_top)

### Sections:

> [COMPILE/INSTALL from Source:](#instl_deb_comp)  
  [INSTALL/UPGRADE from DEB Package:](#instl_deb_iu)  
  [CONFIGURE:](#instl_deb_conf)  
  [FIRST STARTUP:](#instl_deb_fs)  
  [START/STOP/RESTART/RELOAD/STATUS:](#instl_deb_ss)  
  [AUTOSTART:](#instl_deb_as)  
  [LIST PACKAGE FILES:](#instl_deb_ls)  
  [PACKAGE REMOVAL:](#instl_deb_rm)  
  [KNOWN ISSUE - MODEMMANAGER MAY HANG NCID AT BOOT TIME:](#instl_deb_mm)

### <a name="instl_deb_comp"></a>COMPILE/INSTALL from Source:

>* It's very important to update the latest package info before
> continuing. Don't skip these two steps!  (NOTE: The apt command is preferred 
> over apt-get and apt-cache.)
>
>>
>
>          sudo apt update
>          sudo apt upgrade

>> If any packages were listed as "kept back" and "not upgraded", do:
>
>          sudo apt dist-upgrade

>* The following packages are required:
>
>>
>
>          sudo apt install build-essential
>          sudo apt install libpcre3-dev
>          sudo apt install libphonenumber-dev libicu-dev
>          sudo apt install libpcap0.8-dev libpcap0.8
>
>* This python3 package is required to run phonetz, used by ncidd
>
>>
>
>          sudo apt install python3-phonenumbers
> 
>* These packages are required to run the ncid GUI:
>   (pkg tk also installs tcl)
>
>>
>
>          sudo apt install tk bwidget

>* This Perl package is required to run email2ncid, obi2ncid, rn2ncid, wc2ncid, wct, and xdmf2ncid:
>
>>
>
>          sudo apt install libconfig-simple-perl


>* This Perl additional package is required to run wc2ncid, wct and xdmf2ncid:
>
>>
>
>          sudo apt install libdata-hexdumper-perl

>* If the above Perl packages are not in the repository, you can try installing with
  the native Perl package manager called **cpan**:

>          cpan install Config::Simple
>          cpan install Data::HexDump
> 


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

>* Copy `ncid-<version>-src.tar.gz` to any convenient directory, then type the
 following, where &lt;os&gt; is **debian**, **raspbian** or **ubuntu**:
>
>>
>
>          tar -xzvf ncid-<version>-src.tar.gz  
>  
>          cd ncid  
>  
>          make <os>  
>  
>          sudo make <os>-install  
  

### <a name="instl_deb_iu"></a>INSTALL/UPGRADE from DEB Package:

> NCID requires the server and client DEB packages to function. The
  server is required on one computer or device, but the client can be
  installed on as many computers as needed.

> If available, the latest NCID can be installed from a Debian, Raspbian or Ubuntu 
  repository using apt.

> If you cannot find a repository that contains NCID, or if the latest packages
  are not available, you can download them from SourceForge and install them
  using gdebi or dpkg.

> In the sections below:  
> 
>>*  &lt;version&gt; represents the NCID version number (e.g., 1.12)  
>>*  &lt;arch&gt; is the architecture  
>>>* use &lt;armhf&gt; for Raspbian 32 bit processors  
>>>* use &lt;amd64&gt; for 64 bit processors  
>>*  &lt;module&gt; would be a module name like: kpopup, mythtv, samba

> It's very important to update the latest package info before
> continuing. Don't skip these two steps!  (NOTE: The apt command is preferred 
> over apt-get and apt-cache.)
>
>>
>
>          sudo apt update
>          sudo apt upgrade

> - **Install NCID from a repository**

>> - List the available packages:

>>          sudo apt search ncid

>> - Install the server package (required):

>>          sudo apt install ncid_<version>-1_<arch>.deb

>> - Install the client package (optional; includes most of the output modules):

>>          sudo apt install ncid-client_<version>-1_all.deb

>> - Install any additional module packages wanted (optional):  

>>          sudo apt install ncid-<module>_<version>-1_all.deb

>> - Install the gateways package if using a gateway instead of a modem (optional):  

>>          sudo apt install ncid-gateways_<version>-1_<arch>.deb


> - **Install NCID from DEB packages at SourceForge**

>>> If the latest packages are not available at a  repository, download them
  SourceForge. 

>>> Assuming the latest version is 1.12 and you're installing for a 64 bit processor, you would do the following:

>> -  Download the server package (required)

>>          wget https://sourceforge.net/projects/ncid\
>>                  /files/ncid/1.12/ncid_1.12-1_amd64.deb

>> -  If using the client, download ncid-client (optional; includes most of the output modules):

>>          wget https://sourceforge.net/projects/ncid\
>>                  /files/ncid/1.12/ncid-client_1.12-1_all.deb

>> - Download any additional output modules (optional):  

>>          wget https://sourceforge.net/projects/ncid\
>>                  /files/ncid/1.12/ncid-<module>_1.12-1_all.deb

>> -  If using a gateway instead of a modem, download ncid-gateways (optional):  

>>          wget https://sourceforge.net/projects/ncid\
>>                  /files/ncid/1.12/ncid-gateways_1.12-1_amd64.deb

>> - You can use apt, gdebi or dpkg to install the downloaded NCID packages and dependent packages.

>>> - <u>Method 1:</u> Install or Upgrade the packages using apt

>>>> - Install the server (required):

>>>          sudo apt install ./ncid_<version>-1_<arch>.deb

>>>> - Install the client (optional; includes most of the output modules):

>>>          sudo apt install  ./ncid-client_<version>-1_all.deb

>>>> - Install any additional modules (optional):

>>>          sudo apt install ./ncid-<module>_<version>-1_all.deb

>>>> - Install any gateways (optional):

>>>          sudo apt install ./ncid-gateways_<version>-1_<arch>.deb

>>> - <u>Method 2:</u> Install or Upgrade the packages using gdebi-gtk (GUI):
>>>
>>>> - If needed, use the menu item "Add/Remove..." to install the GDebi
    Package Installer.

>>>> -         Using the file viewer:  
>>>>
>>>>        - Open the file viewer to view the NCID DEB packages  
>>>>        - Select the DEB packages  
>>>>        - Double-click selections or right-click selections and select
 "Open with GDebi Package installer"  
>

>>> - <u>Method 3:</u> Install or Upgrade the packages using gdebi (command line):
>>>
>>>> - Install gdebi if needed:

>>>          sudo apt install gdebi

>>>> - Install the server (required):

>>>          sudo gdebi ncid-<version>-1_<arch>.deb

>>>> - Install the client (optional; includes most of the output modules):

>>>          sudo gdebi ncid-client-<version>-1_all.deb

>>>> - Install any additional modules (optional):

>>>          sudo gdebi ncid-<module>-<version>-1_all.deb

>>>> - Install any gateways (optional):

>>>          sudo gdebi ncid-gateways_<version>-1_<arch>.deb

>>> - <u>Method 4:</u> Install or Upgrade the packages using dpkg (command line):

>>>> - Install the server (required):  

>>>          sudo dpkg -i ncid-<version>_<arch>.deb

>>>> - Install the client (optional; includes most of the output modules):

>>>          sudo dpkg -i ncid-client-<version>-1_all.deb

>>>> - Install any additional modules (optional):  

>>>          sudo dpkg -i ncid-<module>-<version>-1_all.deb

>>>> - Install any gateways (optional):  

>>>          sudo dpkg -i ncid-gateways_<version>-1_<arch>.deb

>>>> - Force install of all dependencies:

>>>          sudo apt-get install -f

### <a name="instl_deb_conf"></a>CONFIGURE:

> The ncidd.conf file is used to configure ncidd.

> - The default modem port in ncidd is /dev/ttyACM0.  If you need to change it,
    set your modem port in ncidd.conf.  This assumes serial port 0:  
>
>          set ttyport = /dev/ttyS0

> - If you are using a Gateway to get the Caller ID instead of a
    local modem, you need to set cidinput:  
>
>          set cidinput = 1 # Caller ID from a serial or USB device and optional gateways  
>          set cidinput = 2 # Caller ID from gateways with modem support  
>          set cidinput = 3 # Caller ID from gateways without modem support  

> - If you are using a local modem with or without a Gateway:  
>
>          set cidinput = 0  (this is the default)  

### <a name="instl_deb_fs"></a>FIRST STARTUP:

> - If you are running the server and client on the same computer and 
    using a modem:  
>
>          sudo systemctl start ncidd  
>
>          ncid &

> - If you are running the server and using a gateway:  
>
>          sudo systemctl start ncidd <name of gateway>
>
>          ncid &

> - Call yourself and see if it works, if not:

>> stop the server and gateway:  
>
>>          sudo systemctl stop mcid wc2ncid

>> and continue reading the test sections.

> - If everything is OK, enable the NCID server, gateways and
    client modules you are using to autostart at boot. There 
    are rc.init scripts for starting ncid with output modules, 
    for example: ncid-page, ncid-kpopup, etc.

> #### NOTE:
>> The ncid GUI client must be started after login, not boot.
   There is no ncid.init script to start or stop it.

### <a name="instl_deb_ss"></a>START/STOP/RESTART/RELOAD/STATUS:

> Use the systemctl command to control any of the daemons.  The systemctl
  commands are: start, stop, restart, reload and status.  The client using
  an output module can also be started using the <b>ncid-&lt;module&gt;</b>
  instead of <b>ncid</b>. All output modules can be run at the same time.

> Here are some examples:

> - Start the NCID server:  
>
>>          sudo systemctl start ncidd

> - Stop the sip2ncid server:  
>
>>          sudo systemctl stop sip2ncid

> - Restart the sip2ncid server:  
>
>>          sudo systemctl restart sip2ncid

> - Reload the server alias file:  
>
>>          sudo systemctl reload ncidd

> - Start ncid with ncid-page:  
>
>>          sudo systemctl start ncid-page

> - Status of ncid with ncid-speak:  
>
>>          sudo systemctl status ncid-speak

> Review the man page: **man systemctl**

### <a name="instl_deb_as"></a>AUTOSTART:

> Use the systemctl command to enable/disable the service at boot.

> Here are some examples:

> - Start ncidd at boot:  
>
>>          sudo systemctl enable ncidd

> - Start ncid-page at boot:  
>
>>          sudo systemctl enable ncid-page

> - Disable ncidd startup at boot:  
>
>>          sudo systemctl disable ncidd

> Review the man page: **man systemctl**

> See also [this section about a known issue where ModemManager may hang NCID at boot time](#instl_deb_mm).

### <a name="instl_deb_ls"></a>LIST PACKAGE FILES:

> - To see all the files the package installed onto your system:

>>           dpkg-query -L <package_name>

> - To see the files a .deb file will install

>>          dpkg-deb -c <package_name.deb>

> - To work directly with package names rather than package files, you can use apt-file.  
    It lists contents for packages in your already-configured Apt repositories.  
    It is irrelevant whether any particular package is or is not installed.

>> You may need to install the apt-file package first:

>>          sudo apt-file update
>>          apt-file list package_name

>> After installing apt-file:

>>          apt-file list <package_name>



### <a name="instl_deb_rm"></a>PACKAGE REMOVAL:

> Use apt to remove any NCID package installed.

> For example, to use apt to remove the ncid package:

> - Normal removal without removing configuration files and dependencies:  
>
>>          sudo apt remove ncid

> - Complete removal including configuration files:  
>
>>          sudo apt purge ncid

> - Remove ncid dependencies no longer needed:  
>
>>          sudo apt autoremove

> Review the man page: **man apt**


### <a name="instl_deb_rm"></a>PACKAGE Dependencies:

> Three ways to check package dependencies:

> - apt show &lt;path_to_uninstalled_package&gt;
> - apt-cache depends &lt;Installed_package&gt;
> - dpkg -I &lt;path_to_uninstalled_package&gt;


### <a name="instl_deb_mm"></a>KNOWN ISSUE - MODEMMANAGER MAY HANG NCID AT BOOT TIME:

> #### Configurations known to have the issue:

> - You are running Ubuntu 14.xx or later with the ModemManager installed and running.
> - You are running Debian 9.xx or later and the ModemManager is not installed and/or is not running.
> - You are running Ubuntu Mate on an Raspberry Pi model 3.
> - You are running Raspbian Jessie on an Raspberry Pi model 3.
> - It is a hardware modem mounted internally on a PCI card.
> - It is a USB modem.

> #### Symptoms:

> - The NCID server is not sending caller ID to clients on your network.
> - Clients are unable to connect to the NCID server.
> - The NCID server log /var/log/ncidd.log indicates modem
>   initialization did not complete and appears to be hung.
>   This also prevents other processes after it from starting until the NCID server is killed.
> - You may see very strange modem responses in the NCID server log.
> - The NCID server problem is fixed by manually restarting it after the Operating System boots.
> - The NCID server problem is fixed by manually unplugging and re-plugging in the USB modem.

> #### Solution: If the ModemManager is installed

>> The ModemManager is searching for a mobile broadband (2G/3G/4G) capable devices,
>> by querying various Serial and USB connected devices at boot time,
>> by sending "AT+GCAP" (the AT command for a modem to "Request Complete Capabilities List").
>> This can collide in terms of the devices initialization timing, with the NCID server and the XDMF to NCID gateway.

>> The solution is to create the udev rules that will exclude from probing,
>> devices used by the NCID server and XDMF to NCID gateway.  
>> Check out /usr/share/doc/ncid/README-udev for details.

>> Disabling the ModemManager should be used as a last resort,
>> if for some reason the method of the udev rules fails.
  
>> Issue the following commands:
>
>>          sudo systemctl disable ModemManager.service  
>>          sudo systemctl stop ModemManager.service  
>>          sudo systemctl status ModemManager.service  

>> The **disable** line will prevent ModemManager from starting at boot.

>> The **stop** line will terminate the currently running instance of
>> ModemManager.

>> The **status** lines should look like this:  
>
>>          ● ModemManager.service - Modem Manager  
>>             Loaded: loaded (/usr/lib/systemd/system/ModemManager.service; disabled; vendor preset: enabled)  
>>             Active: inactive (dead)  

>> In the cases where the Operating System has no systemctl available, 
>> disable ModemManager completely by removing its execute permissions, 
>> with the following command:  
>
>>          sudo chmod ugo-x /usr/sbin/ModemManager
