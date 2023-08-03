<!-- Tools.md - Removable HEADER Start -->

Last edited: Nov 9, 2020

<!-- Removable HEADER End -->

## <a name="tools_top"></a> Command Line Tools

> [Table of Contents](#doc_top)

### Tools Index

> [Overview](#tools_ov)  
>  [cidalias](#tools_alias)  
>  [cidcall](#tools_call)  
>  [cidnumber-info](#tools_numberinfo)  
>  [cidupdate](#tools_update)  
>  [get-fcc-list](#tools_fcc)  
>  [get-areacodes-list](#tools_areacodes)  
>  [ncid-yearlog](#tools_yl)  
>  [ncidutil](#tools_util)  
>  [update-cidcall](#tools_callupdate)

### <a name="tools_ov"></a>Overview

> NCID has command line Perl scripts (also called tools) that can
> list or modify the ncidd.alias, ncidd.blacklist, ncidd.whitelist and
> cidcall.log files.

> > There are four tools for dealing with the alias, blacklist and whitelist files:

> > > cidalias, cidcall, cidupdate and ncidutil.

> > If you edit and modify ncidd.alias, ncidd.blacklist, or ncidd.whitelist
> > with an editor:

> > - (optional) Run cidupdate after modifying ncidd.alias to update the

    cidcall.log file with the new aliases

> > - Force the server to reload ncidd.alias, ncidd.blacklist and ncidd.whitelist:

> > > > sudo pkill --signal SIGHUP ncidd

> NCID has a tool for creating a yearly call log from the monthly call logs.
> The yearly call log is updated each month. The monthly call logs are only
> kept for a specific period of time but yearly call logs are kept until deleted.

#### <a name="tools_alias"></a>cidalias

> The **cidalias** tool displays aliases in the alias file in one of
> three different formats: raw, human readable and delimited.

> See the [cidalias.1](http://ncid.sourceforge.net/man/cidalias.1.html)
> man page for a complete description and all options.

#### <a name="tools_call"></a>cidcall

> The **cidcall** tool is used to view either the cidcall.log file or the cidcall-<test>.log
> in one of two different formats: raw and human readable. The default is to display BLK, CID,
> HUP, OUT, PID and WID lines from the cidcall.log file in a human readable format. Messages and Smartphone Notes will be viewed when their option is selected.

> See the [cidcall.1](http://ncid.sourceforge.net/man/cidcall.1.html)
> man page for a complete description and all options.

> EXAMPLES:

> > View all call types, but not message types:

                cidcall

> > View messages and notes:

               cidcall --MSG --NOT

> > View all call types from the 2018 call log:

               cidcall --yearlog 2018

> > Assuming the current year is 2019, view all call types from up to but not including the
> > current month in the cidcall.log:

               cidcall --year 2019

#### <a name="tools_numberinfo"></a>cidnumber-info

> The **cidnumber-info** tool looks up a phonenumber and shows the number formatted
> for the country of the number along with the following name and data fields in the
> ncidd call log format

#### <a name="tools_update"></a>cidupdate

> The **cidupdate** tool is used to update the cidcall.log file with
> newly created aliases. It is also used by the server whenever clients
> want the call logfile updated.

> Command Line Usage:

> - Add one of more aliases to ncidd.alias

> - Run **cidupdate** to update cidcall.log for any calls that require

    the new alias or aliases.

> - Reload ncidd.alias, ncidd.blacklist and ncidd.whitelist:

> > > sudo pkill --signal SIGHUP ncidd

> See the [cidupdate.1](http://ncid.sourceforge.net/man/cidupdate.1.html)
> man page for a complete description and all options.

#### <a name="tools_fcc"></a>get-fcc-list

> The **get-fcc-list** script is usually called daily from a crontab
> to fetch the `fcc.blacklist` from a server for use by hangup-fcc or
> to be added to the ncidd.blacklist.

> It is more completely described in its own section about using the
> [CallerID Blacklist from FCC Data](#fccdata_top)

#### <a name="tools_areacodes"></a>get-areacodes-list

> The **get-areacodes-list** script only needs to be called every six months
> or less to fetch a newer list of valid area codes for hangup-fakenum.
> It can be added the a crontab if desired.

> It is more completely described in its own section about using the
> [CallerID Blacklist from FCC Data](#fccdata_top)

#### <a name="tools_yl"></a>ncid-yearlog

> The **ncid-yearlog** tool automatically creates a yearly call log from the monthly call logs. It is
> called from the user's crontab on the first of the month.
> Review [Yearly Logs](#log_year) and
> [ncid-yearlog.1](http://ncid.sourceforge.net/man/ncid-yearlog.1.html)

#### <a name="tools_util"></a>ncidutil

> The **ncidutil** tool is only used by the server to add, modify, or remove
> entries from ncid.alias. It is also used by the server to add or
> remove entries from ncidd.blacklist and ncidd.whitelist.

> See the [ncidutil.1](http://ncid.sourceforge.net/man/ncidutil.1.html)
> man page for a complete description and all options.

#### <a name="tools_callupdate"></a>update-cidcall

> The **update-cidcall** tool adds the new name and data fields from **ncidnumber-info**
> to the lines from the **cidcall.log** file. The output is sent to STDOUT.
