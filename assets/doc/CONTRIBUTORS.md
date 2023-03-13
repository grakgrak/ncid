<!-- CONTRIBUTORS.md - Removable HEADER Start -->

Last edited: Jun 24 2021

<!-- Removable HEADER End -->

## <a name="contrib_top"></a>NCID Contributors

> [Table of Contents](#doc_top)
 
> Any omissions are entirely my fault.  Please notify
  [jlc](mailto:jlc@users.sourceforge.net) of any corrections
  or additions.

#### [John L. Chmielewski](mailto:jlc@users.sourceforge.net)
*   Designed, developed and wrote most of the programs.

#### [Mark Salyzyn](mailto:mark@bohica.net)
*   Ported `ncidd` to BSD and Macintosh.
*   Wrote `getopt.c` and `poll.c`.

#### Mace Moneta
*   Wrote `nciduser`, which was the basis for `ncid-speak`.
*   Contributed ideas and code to `ncid` client.
*   Contributed the Mac OS X portion of `ncid-speak`.

#### [Dan Lawrence](mailto:dan@cutthatout.com)
*   Contributed to `ncid-email` so paging would work.
*   Contributed information on [freewrap](http://freewrap.sourceforge.net/)
    for `ncid` client on Windows.

#### [Aron Green](mailto:agreen@pobox.com)
*   Helped fix `termios` settings to work with FreeBSD.
*   Contributed `ncid.sh` and `ncidd.sh` start/stop scripts for FreeBSD.
*   Contributed ideas for `ncidd` and `ncid`.

#### [Troy Carpenter](mailto:troy@carpenter.cx)
*   Developed `ncid-samba` to send CID info to Samba for a Windows popup.

#### [Lyman Epp](mailto:lyman@epptech.com)
*   Wrote the first version of `ncidrotate` in python.

#### Rick Matthews
*   Provided information on distinctive ring.

#### Michael Nygren
*   Provided information on the +GCI modem code, so CID will work with  
    modems that need a country code.

#### Mitch Riley
*   Provided information needed to create the `ncid-mythtv` script.

#### Roger Knobber
*   Provided patch for *strdate()* in `ncidd.c` to fix null pointer in  
    *gettimeofday()* in version 0.61.

#### [Rich West](mailto:Rich.West@wesmo.com)
*   Helps maintain the `ncid-mythtv` module.
*   Provided an NSIS script as a basic installer for the `ncid`  
    Windows client.

#### [Clayton O'Neill](mailto:coneill@oneill.net)
*   Modified `ncidd` to be able to run with no serial device.
*   Added the ability to inject CID from clients.
*   Contributed the `ncid-sipinject` program which was renamed  
    `ncidsip`.

#### [David LaPorte](mailto:dlaPorte@users.sourceforge.net)
*   Improved `ncidsip` to work with a missing name.
*   Improved `ncidsip` to detect outgoing calls containing a SIP REGISTER  
    packet so they are not treated as incoming calls.

#### [Michael Lasevich](mailto:michael@lasevich.net)
*   Wrote and contributed `yac2ncid`.
*   `ncid-yac` was developed from a module he wrote.
*   Helped write the man pages.

#### [Randy Rasmussen](mailto:randyr505@gmail.com)
*   Wrote and contributed the `ncid-kpopup` client output module.

#### Jonathan Wolf
*   Hacked `ncid` to provide ring indication when Caller ID not available.  
    (His hack was not used, but his feature was added to `ncidd`.)

#### [littlepepper](mailto:littlepepper@users.sourceforge.net)
*   Provided the Mac OS X modem init string for the iMac.

#### [Marko Koski-Vähälä](mailto:marko@koski-vahala.com)
*   Contributed `ncid` client code to format numbers for Sweden.  
    The client can now format numbers for "US" and "SE".

#### [Chris Lenderman](mailto:chris@lenderman.com)
*   Helped rewrite *sendLog()* code to eliminate corruption sending  
    large log files (greater than 2,000 lines).
*   Converted `testclient` from using *netcat* to using sockets.
*   Maintained the Windows version of `NCIDPop`.
*   Created (and maintains) a complete rewrite of `NCIDPop` in Java  
    making `NCIDPop` cross-platform for Mac, Windows, Linux.
*	Created (and maintains) `NCID Android` client. 

#### [Todd Andrews](mailto:taa@pobox.com)
*   Corrected problems in the INSTALL document.
*   Helped with server testing and fixing various Mac OS X problems.
*   Provided a server fix for the hangup configuration/option  
    problem on Mac OS X.
*   Developed `ncid-nma` output module which became part of `ncid-notify`.
*   Developed `wc2ncid` gateway.
*   Helped improve various NCID documentation.
*   Did a lot of work for the NCID 0.85 and 0.86 distributions.
*   In general, helps with various NCID programs and documentation.
*   provided help with verious NCID issues through the years

#### [Jeff Rabin](mailto:jeff@jrgator.com)
*   Helped with the `ncidd` hangup option by testing, reviewing  
    documentation, suggesting improvements and providing patches.
*   Created the `ncidd` configuration option *ignore1* patches.

#### [Neven Ćosić (Sensei)](mailto:senseitcom (at) email (dot) t (hyphen) com (dot) hr)
*   Added country code HR (Croatia) to `ncid` and `ncid.conf`.
*   Added alternate date formats and separators.
*   Wrote a `ncid-tiny` module that became the basis for `ncid-alert`.
*   Introduced and tested the CTI Comet USB Caller ID device.
*   Introduced and tested the udev rules.
*   Added CallLog option to the NCID client for the NoGUI mode.
*   Added NightMode option to the NCID client for the GUI mode.
*   Wrote NCID Alert Autostart file that became the basis for a modified  
    version that is generated from the ncid.desktop file when needed.
*   Added `udev-action` auxiliary script.
*   Introduced and edited the documentation in PDF format.
*   Added alert_call and alert_message options to `ncid-alert`,  
    makes Caller ID and Integral Message or Notice data shown  
    in Alert messages configurable.
*   Added YearDot option to the NCID client.
*   Introduced and tested the Holtek HT9032D based PSTN Caller ID module.
*   In general, helps with various NCID programs and documentation.

#### [Steve Limkemann](mailto:stevelim@wwnet.com)
*   Modified `ncidd` to output CID information quickly if a name is not   
    part of the Caller ID received.
*   Improved the `cidupdate` tool.
*   Improved the `ncid` GUI, by adding multiple features such as window  
    resizing and the ability to change font names and font sizes.
*   Added wakeup feature to `ncid` and wrote the `ncid-wakeup` module.
*   In general, helps with various NCID programs.

#### [Tod Cox](mailto:btcox@stetson.edu)
*   Ported NCID to the Raspberry Pi running the Raspbian OS.

#### [Nicholas Riley](mailto:nriley@sabi.net)
*   Maintained `NCIDPop` for Mac OS X.

#### [Alexei Kosut](mailto:akosut@cs.stanford.edu)
*   Original developer of `NCIDPop` for Mac OS X and Windows.

#### [David J. Lauria](mailto:djlauria@gmail.com)
*   developed ncid-fly for the TiVo
*   helped with ncidmod for the TiVo
*   provided NCID compatibility into his cidrss Tivoweb module
*   provided help with verious NCID issues through the years

#### [Reece Pollack](mailto:rrpollack@users.sf.net)
*   Provided patch to ncidd for regular expressions

#### [Kris Jensen](mailto:kjen@users.sf.net)
*   developed procedure for creating the announce.rmd file.
*   donated modem recording files:  
    NumberDisconnected.wav and NumberDisconnected.rmd

#### [Pete Bekatoros](mailto:snxx@users.sf.net)
*   donated modem recording files:  
    CallingDeposit.pvf CallingDeposit.rmd  
    CannotBeCompleted.pvf CannotBeCompleted.rmd  
    NotInService.pvf NotInService.rmd

#### [Mike Stember](mailto:ncid@thestembers.com)
* Developed a way to process the United States Federal Communications Commission (FCC) robocaller/telemarketer data file in Excel, filter out the most likely candidates and create a text file that is NCID-friendly.
* Volunteered to monitor the FCC site for updates and continues to maintain the NCID-friendly text file as a download on the NCID Wiki.

#### [Randy Tarantino](mailto:tarantir@users.sf.net)
*   created ncid-mysql output module to log call data to MySQL database

#### [Reece](mailto:rrpollack@users.sf.net)
*   fixed voice hangup to work with USB modems
*   see [bug #25](https://sourceforge.net/p/ncid/bugs/25/)

#### [Ed Attfield](mailto:ed_attfield@users.sf.net)
*   wrote part of the DIAL code
*   wrote [hangup-fakenum](https://sourceforge.net/p/ncid/discussion/275236/thread/9907d304/)
*   updated [FCC Data on Unwanted Calls](FCC2ncid at https://sourceforge.net/p/ncid/wiki/FCC%20Data%20on%20Unwanted%20Calls/)
*   rewrote saveSend() in ncidd.c
*   cleaned up ncidd.c

#### [Jason Trinklein](mailto:jason@trinklein.net)
*   provided steps to use Linphone as a SIP client

#### [Jon Tulk](jon.tulk@comcast.net)
* created the hangup-greylist extension and its man pages

#### [Bruno Grasland](b.sletteland@orange.fr>)
* submitted bug reports and fixes for ncidd, ncid-mythtv and ncidutil
* implemented WID (call waiting) for modems that support it 
* Proposed and implemented integration of libphonenumber in nicd for
  international number formating and displaying
  of phone numbers geographical data. 
* wrote libcarrier (c++ derivative of libgeocoding) in order to be
  able to display phone number carriers in ncid
* wrote the original scripts for carrier metadata generation for US/CAN/FR/JP




#### New Feature Requests, Bug Reports, Testing Fixes and Testing New features
> Adam 'Starblazer' Romberg  
  Andy Nunez  
  Andy Writter  
  Aron Green  
  Carl Johnson  
  Charlie Heitzig  
  Dan Lawrence  
  David LaPorte  
  George Johnson  
  Joe Nardone  
  Jonathan Wolf  
  Ken Appell  
  Lloyd Stahlbush  
  Mace Moneta  
  Marko Koski-Vähälä  
  Matt Short  
  Michael Lasevich  
  Nicholas Davies  
  Paul Miller  
  Phil Fitzpatrick  
  Rick Matthews  
  Steve Forman  
  Steve Major  
  Troy Carpenter  

#### Feedback On Working Modems
> Derek Huxley

