<!-- INSTALL.md - Removable HEADER Start -->

Last edited: Mar 28, 2022

<!-- Removable HEADER End -->

## <a name="instl_generic_top"></a>Generic INSTALL and Overview

> If you're using a gateway, review the appropriate section in [Gateways](#gateways_top).

> [Table of Contents](#doc_top)

### Sections

> * [LAYOUT:](#instl_generic_layout)
> * [COMPILE:](#instl_generic_compile)
> * [INSTALL:](#instl_generic_install)
> * [TEST USING a Modem:](#instl_generic_modem)
> * [TEST USING a Device (like the NetCallerID box):](#instl_generic_device)
> * [TEST USING a Gateway:](#instl_generic_gw)

### <a name="instl_generic_layout"></a>LAYOUT:

> #### Programs, config files, modems, devices and log files
> * The programs go into `$prefix/bin` and `$prefix/sbin`.
> * The config file goes into `$prefix2/etc`.
> * The modem device is expected in `$prefix3/dev`.
> * The LOG file is expected in `$prefix3/var/log`.
> * The man pages go into `$MAN` which is `$prefix/share/man`.
> * The Makefile targets are determined by the defaults used
> * To view the target list with the prefix settings, type: make usage

> #### OS that uses systemd service files during boot
> * The service files go into $prefix/usr/lib/systemd/system .

> #### RPM based OS (Fedora, Redhat and CentOS) that uses init files during boot
* The init scripts go into `$prefix2/etc/rc.d/init.d`.

> #### Debian based OS (Debian, Raspbian on Raspberry Pi and Ubuntu) that uses init files during boot
* The init scripts go into `$prefix2/etc/init.d`.

> #### FreeBSD uses rc files during boot
* The rc scripts go into `$prefix2/etc/rc.d`.

> #### Macintosh OSX
* The plist scripts go into `$(prefix3)/Library/LaunchDaemons`.

### <a name="instl_generic_compile"></a>COMPILE:

> #### *Requirements*
>>* gmake (GNU make)  
>>* gcc, g++ and c++ compilers  
>>* libpcap and header files are needed for  
>>>- `sip2ncid`  
>>* libpcre and header files are needed for  
>>>- `cidupdate`  
>>>- `ncidd`  
>>>- `ncidnumberinfo`  
>>* libphonenumber and header files are needed for  
>>>- `cidupdate`  
>>>- `ncidd`  
>>>- `ncidnumberinfo`  
>>* libicu and header files are needed for  
>>>- `cidupdate`  
>>>- `ncidd`  
>>>- `ncidnumberinfo`  
>>* python3-phonenumbers is needed for
>>>- `phonetz - used by ncidd`  
>>* tcl is needed for  
>>>- `ncid` non-graphical client and all output modules  
>>* tk is needed for  
>>>- `ncid` GUI client  
>>* bwidget is needed for  
>>>- `ncid` GUI client
>>* Perl module Config::Simple is needed for  
>>>- `email2ncid.pl`  
>>>- `obi2ncid`  
>>>- `rn2ncid`  
>>>- `wc2ncid`  
>>>- `wct`  
>>>- `xdmf2ncid`  
>>* Perl module Data::HexDump is needed for    
>>>- `wc2ncid`  
>>>- `wct`  
>>>- `xdmf2ncid`  

> #### *Notes*

>> * The Makefiles require GNU make.

>> * All of the supported OS distributions should have `libpcap` in their
  repositories. If it's missing, obtain it from [TCPDUMP & LIBPCAP](http://www.tcpdump.org/).

>> * Each supported OS distribution can have a different package manager,
  and the package names can also be different. See [Installation](#install_top) and
  look for an INSTALL-&lt;name&gt; appropriate for your OS.

>> * For the required Perl modules, if they are available for installation using the OS
  distribution package manager, do so. This results in the best experience in terms of
  updates and security fixes. However, if they are not available, they can be installed
  using Perl's native package manager called CPAN. There are a few different ways
  that CPAN might have been configured as to how it handles root or sudo access, and
  generally it is safe to assume it was configured for the simplest usage.

>>>> If you only need to install one of the packages:

>>>          cpan Config::Simple
>>>>> or

>>>          cpan Data::HexDump
  
>>>> You can combine them on one line if you need both:

>>>          cpan Config::Simple Data::HexDump

> #### *Compile to your desired directory structure*

>> See the top of the Makefile for more information on targets.


>> * To compile programs and config files for /usr/local:

>>          make local

>> * To compile programs for /usr and the config file for /etc:

>>          make package

### <a name="instl_generic_install"></a>INSTALL:

>> See the top of the Makefile for more information on targets.

>> * To install in `/usr/local` (man pages go into `/usr/local/share/man`):
>
>>          sudo make install

>> * To install in `/usr/local` (man pages go into `/usr/local/man`):
>
>>          sudo make install MAN=/usr/local/man

>> * To install programs in `/usr`:
  config file in `/etc`,  
  and man pages in `/usr/share/man`:
>
>>          sudo make package-install  
>> or
>
>          sudo make install prefix=/usr prefix2=

### <a name="instl_generic_modem"></a>TEST USING a Modem:

> * Start in this order (you may need `sudo ncidd` to access the modem):
>
>          ncidd  
>          ncid

> * Call yourself.

> * If you have problems, start `ncidd` in debug mode:  
>
>          ncidd -D

> * To get more information, add the verbose flag:  
>
>          ncidd -Dv3

> * To also look at the alias, blacklist and whitelist structure:
>
>          ncidd -Dv9

> * The last three lines will be similar to:
>
>          Network Port: 3333  
>          Wrote pid 20996 in pidfile: /var/run/ncidd.pid
>          End of startup: 04/01/2016 20:28:06

> * If `ncidd` aborts when you call yourself with something like:
>
>          Modem set for CallerID.  
>          Modem Error Condition. (Phone rang here)  
>          /dev/ttyS1: No such file or directory
>
>     You need to set `ncidd` to ignore modem signals.
>
>     Uncomment the following line in `ncidd.conf`:
>
>               # set ttyclocal = 1
>
> * You should see the Caller ID lines between the first and second RING.

> * If Caller ID is not received from the modem and if *gencid* is not set
  you will only see RING for each ring.

> * If *gencid* is set (the default), you will get a CID at RING number 2:
>
>          07/13/2010 15:21  RING No Caller ID

>>  This indicates one of three problems:
>>
>> * The modem is not set for Caller ID.  
>> * The modem does not support Caller ID.  
>> * The Telco is not providing Caller ID.

> * Once you solve the problems, restart `ncidd` normally.

### <a name="instl_generic_device"></a>TEST USING a Device (like the NetCallerID box):

> * Start in this order:
>
>          ncidd  
>          ncid

> * Call yourself.

> * If you have problems, start `ncidd` in debug mode:
>
>          ncidd -D

> * To get more information, add the verbose flag:
>
>          ncidd -Dv3

> * To also look at the alias, blacklist and whitelist structure:  
>
>          ncidd -Dv9

> * The last three lines will be similar to:
>
>          Network Port: 3333  
>          Wrote pid 20996 in pidfile: /var/run/ncidd.pid  
>          End of startup: 04/01/2016 20:28:06

> * Once you solve any problems, restart `ncidd` normally.

### <a name="instl_generic_gw"></a>TEST USING a Gateway:

> * You may need to configure options. Review the appropriate section in [Gateways](#gateways_top).  

> * Start in this order:
>
>          ncidd  
>          <name of gateway>  
>          ncid  
>     For example:
>
>          ncidd  
>          sip2ncid  
>          ncid

> * Call yourself.

> * If you have problems, start `ncidd` in debug mode:
>
>          ncidd -D

> * To get more information, add the verbose flag:
>
>          ncidd -Dv3

> * To also look at the alias, blacklist and whitelist structure:  
>
>          ncidd -Dv9

> * The last three lines will be similar to:
>
>          Network Port: 3333  
>          Wrote pid 20996 in pidfile: /var/run/ncidd.pid  
>          End of startup: 04/01/2016 20:28:06

> * Once you solve any problems, restart `ncidd` normally.

