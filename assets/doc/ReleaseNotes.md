<!--Last Edit on Feb 14, 2022 jlc -->

# Release Notes for NCID 1.13

[TOC]

## Overall System Requirements

> - Google libphonenumber integration
>   > - libphonenumber version 7 or higher
>   > - libicu version 67 or higher

> - ncid client and output modules
>   > - TCL/TK version 8.6.6 or higher for ncid client and output modules

> - Operating System versions for NCID 1.12 and higher
>   > If no minimum version is specified below, we're not aware of any limitations.
>   >
>   > Unless specified, 32bit and higher processors are supported.
>
> > - Cygwin is no longer supported
> > - FreeBSD
> > - Macintosh OS X\* 10.9.5 (Mavericks) or higher using XQuartz, Intel 64bit processors only
> > - Debian based OS
> >   > - Debian Stretch (version 9) or higher
> >   > - Raspbian\* Stretch (version 9) or higher, 32bit processors only
> >   > - Ubuntu
> > - RPM based OS
> >   > - Fedora
> >   > - Redhat
> >   > - CentOS

> > > \* We're aware of operating system name changes but not all of our documentation has been updated yet:
> > >
> > > > \- Macintosh OS X became macOS as of June 13, 2016  
> > > > \- Raspbian became Raspberry Pi OS (RPiOS) as of May 29, 2020

## NCID Distributions

> - SourceForge
> - Cygwin Windows package
> - FreeBSD package
> - Macintosh OS X package
> - Windows client installer
> - Debian based OS packages
>   > - Debian
>   > - Raspbian (Raspberry Pi)
>   > - Ubuntu
> - RPM based OS packages
>   > - Fedora
>   > - Redhat
>   > - CentOS

> ### SourceForge

          * NCID source package:           ncid-1.13-src.tar.gz

          * Cygwin Windows package:        not available

          * FreeBSD 64 bit package:        ncid-1.13-FreeBSD_install.sh

          * Macintosh 64 bit OS X package: not available

          * Windows client installer:      ncid-1.13-client_windows_setup.exe

          * Debian based OS packages
            ------------------------

                 Debian 64 bit packages:   ncid_1.13-1_amd64.deb
                                           ncid-gateways_1.13-1_amd64.deb

                 Debian no-arch packages:
                                           ncid-client_1.13-1_all.deb
                                           ncid-kpopup_1.13-1_all.deb
                                           ncid-mysql_1.13-1_all.deb
                                           ncid-mythtv_1.13-1_all.deb
                                           ncid-samba_1.13-1_all.deb
                                           ncid-speak_1.13-1_all.deb

                 Raspbian 32 bit packages: ncid_1.13-1_armhf.deb
                                           ncid-gateways_1.13-1_armhf.deb


          * RPM based OS packages
            ---------------------

                 RPM source package:       ncid-1.13-1.fc34.src.rpm

                 RPM 64 bit packages:      ncid-1.13-1.fc34.x86_64.rpm
                                           ncid-gateways-1.13-1.fc34.x86_64.rpm

                 RPM no-arch packages:     ncid-client-1.13-1.fc34.noarch.rpm
                                           ncid-kpopup-1.13-1.fc34.noarch.rpm
                                           ncid-mysql-1.13-1.fc34.noarch.rpm
                                           ncid-mythtv-1.13-1.fc34.noarch.rpm
                                           ncid-samba-1.13-1.fc34.noarch.rpm
                                           ncid-speak-1.13-1.fc34.noarch.rpm

> ### Cygwin Windows package

> > Not available. Cygwin does not provide the necessary library dependencies for libphonenumber.

> ### FreeBSD package

> > Available at FreshPorts.
> >
> > > http://www.freshports.org/comms/ncid/

> ### Macintosh OS X package

> > Not available. Library dependencies can only be resolved by compiling from source.

<!--
>> The version available at MacPorts is 0.83 which was released
>> October 2011. It is not currently maintained:
>>
>>> http://trac.macports.org/browser/trunk/dports/net/ncid/Portfile
>>
>> Use the version available at SourceForge.
-->

> ### Windows client installer

> > Use the version available at SourceForge.

> ### Debian based OS packages

> > #### Install from repositories:

> > > There are currently no known Debian repositories that host NCID.

<!--
>>> A new release of NCID is first available at Sourceforge. Some time later it is
   available at the Debian repositories.

>>> The install packages include the server, client, optional gateway packages and
   optional output module packages.  Normally you only need to install the **ncid**
   and **ncid-client** deb packages.  The **ncid-gateways** can be installed
   if needed.

>> The apt-cache search command will show you the packages available:
>>
          apt-cache search ncid\*
-->

> > #### Install from the files at SourceForge:

    - Download the latest NCID DEB packages from SourceForge:
      ncid DEB Package          - server, extensions and tools
      ncid-client DEB Package   - client and default output modules
                                  (if using this client)
      ncid-gateways DEB Package - gateways (if using a gateway)

> >

    - Download any optional output modules wanted:
      ncid-MODULE DEB Package   - optional client output modules

> >

    - Install or Upgrade the packages using apt or apt-get (command line):
        * Install the NCID server and gateways:
          sudo apt install ./ncid-<version>_<processor>.deb
        * Install the client package and default modules:
          sudo apt install ./ncid-client-<version>_all.deb
        * Install any optional modules:
          sudo apt install ncid-<module>-<version>_all.deb

> >

    Notes:
        <version> would be something like: 1.13-1
        <processor> would be: i386, armhf, amd64
        <module> would be: kpopup, mysql, mythtv, samba, speak

> > #### Build a package for your specific Debian based OS or release

> > > The build-essential, fakeroot and libpcap packages must be installed:

          sudo apt-get build-essential fakeroot libpcap0.8-dev
          tar -xzf ncid-1.13-src.tar.gz
          mv ncid ncid-1.13
          cd ncid-1.13
          fakeroot Debian/rules build
          fakeroot Debian/rules binary
          fakeroot Debian/rules clean

> ### RPM based OS packages

> > #### Install from repositories:

> > > A new release of NCID is first available at Sourceforge. Some time later it is available
> > > at the Fedora or other RPM repositories which includes the Rawhide repository for
> > > the next Fedora release.

> > The install packages include the server, client, optional gateway packages and
> > optional output module packages. Normally you only need to install the **ncid**
> > and **ncid-client** rpm packages. The **ncid-gateways** can be installed
> > if needed.

> > The dnf list command will show you the packages available:

          dnf list ncid\*

> > If the above does not show version 1.13:

          dnf --enablerepo=rawhide list ncid\*

> > If the rawhide repo is not installed:

          dnf install fedora-release-rawhide

> > #### Build a package for your specific RPM based OS or release

> > > The rpmbuild package must be installed:

          rpmbuild -tb ncid-1.13-src.tar.gz

> > If a dependency can not be resolved, you should try rebuilding packages:

    - Download the latest NCID RPM packages from SourceForge:
      ncid RPM Package          - server, extensions and tools
      ncid-gateways RPM Package - gateways (if using a gateway)
      ncid-client RPM Package   - client and default output modules
                                  (if using this client)
    - Download any optional output modules wanted:
      ncid-MODULE RPM Package  - optional client output modules
    - Install or Upgrade the packages using dnf
          * Install the NCID server and gateways:
            sudo dnf install ncid-<version>.fc34.x86_64.rpm
          * Install the client package and default modules:
            sudo dnf install ncid-client-<version>.fc34.noarch.rpm
          * Install any optional modules wanted:
            sudo dnf ncid-<module>-<version>.fc34.noarch.rpm

> >

    Notes:
        <version> would be something like: 1.13-1
        <module> would be: kpopup, mysql, mythtv, samba, speak

## Server Changes

> ncidd:

> - will decode MESG codes
> - misc code improvements
> - created more source files
> - added support for a total of 4 modems
> - sends the entries for name, number and line in the Alias, Blacklist and Whitelist tables to the client to allow it to handle expressions
> - added a pause hangup function to allow the client to pause hangup

> ncidd.conf:

> - updated language comments
> - updated cidinput description
> - relocated "Dial Timeout" section
> - added "Additional Modems and Serial Devices Section"
> - miscellaneous comment changes

> ncidd.alias

> ncidd.blacklist

> ncidd.whitelist:

> modemhdr.conf:

> - new, used when creating modem[2345].conf files

## Service Files Changes

## Server Extensions Changes

## Udev Files Changes (Linux Only)

## Gateway Changes

> obincid:

> - Fixed date and time to be the same in the CALL and CALLINFO lines

> sip2ncid:

> - Fixed date and time to be the same in the CALL and CALLINFO lines

> wc2ncid:

> - Internal clock set at startup
> - Fixed date and time to be the same in the CALL and CALLINFO lines

## Client Changes

> ncid:

> - misc code improvements
> - fixed if statement for env(HOME) to not kill ncid when systemctl starts an ncid module
> - changed logging default from disabled to enabled
> - changed fixed processing of alias, blacklist and whitelist from server to handle expressions
> - added locales for French, German, and Japanese
> - added tooltip
> - added icons for the NTYPE and CTRY columns
> - added procedure to pause ncidd automatic hangup up to 10 hours, and to restore hangup while in pause
> - replaced text history window with a tablelist window
> - unwanted history window columns are now hidden instead of removed
> - all history window columns but the first one can be hidden, but any 3 columns must be viewed
> - some menu items in the server menu have been moved to a context menu on a history line
> - added user notes for any line in the history window
> - additional help items were added to the help menu
> - updated Usage

> ncid.conf:

> - relocated "Log File" Section"
> - changed the verbose default from 0 to 1
> - miscellaneous comment changes

## Client Output Module Changes

> all modules:

## Client AppStream data Changes

> ncid.appdata.xml

> - updated text and links to updated and new screenshots

## Setup Scripts Changes

## Tools Changes

> cidcall:

> - fixed name, number and lineid to handle most printable characters
> - fixed to handle a MSG or NOT with no attributes
> - changed the --format|-f 0" option to accept other options
> - updated man page

> cidupdate:

> - updated for changes to checkBlacklist() and checkWhitelist()
> - code fixes and improvements

> ncid-yearlog:

> ncidutil.pl

> wct.pl

> - some improvments to code

> ncidnumberinfo:

> phonetz

> - new, used to get the caller's local time

## Screenshots Changes

> - updated screenshots
> - added new screenshots

## Documentation Changes

> Updated Manual Pages:

> - ncid.1
> - ncidnumberinfo.1
> - ncid-email2ncid-setup.1
> - ncid-page.1
> - ncid-setup.1
> - ncid-skel.1
> - ncid-wakeup.1
> - ncid.conf.5
> - ncid_tools.7
> - ncidd.8

> new man pages

> - ncid_modems.7
> - phonetz.1

> Updated User Manual:

> - INSTALL.md
> - INSTALL-Cygwin.md
> - INSTALL-DEB.md
> - INSTALL-Fedora.md
> - INSTALL-FreeBSD.md
> - INSTALL-Mac.md
> - INSTALL-Redhat.md
> - InstallIndex.md
> - ReleaseNotes.md
> - Verbose.md

> Updated API:

> - misc improvements
> - updated README.test
