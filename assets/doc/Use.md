<!-- Use.md - Removable HEADER Start -->

Last edited: May 31, 2018

<!-- Removable HEADER End -->

## <a name="use_top"></a> Using NCID

> [Table of Contents](#doc_top)

> [Description](#use_des)

### <a name="use_des"></a> Description

> NCID's main job is to display the Caller ID on multiple devices, but
> it has advanced features.

> NCID can send and receive one line messages. It can also forward a message
> through a gateway. Review the **Messages** section for more information.

> NCID can give the caller a new name, called an alias. It can do the
> same with the caller's number or the line of the received call.
> Review the **Alias** section for more information.

> NCID can automatically hang up on the caller if the number or name is
> entered into its blacklist.
> Review the **Hangup** section for more information.

> NCID can execute a hangup extension as another way to determine if it
> should hangup on a call.
> Review the **Server Extensions** section for more information.

> NCID provides the ncidd.alias, ncidd.blacklist and ncidd.whitelist configuration files.
> The [cidalias](http://ncid.sourceforge.net/man/cidalias.1.html) tool views alias
> definitions in the NCID alias, blacklist and whitelist files. The
> [ncidutil](http://ncid.sourceforge.net/man/ncidutil.1.html) tool modifies
> the ncidd.alias, ncidd.blacklist and ncidd.whitelist files. The
> [cidupdate](http://ncid.sourceforge.net/man/cidupdate.1.html) tool updates the current
> call log file using entries found in the alias file.
> Review the **Command Line Tools** section for more information.

> NCID provides a call log in the /var/log/cidcall.log file for calls and messages.
> It is processed each month if the operating system uses logrotate for the
> system log files. The [cidcall](http://ncid.sourceforge.net/man/cidcall.1.html)
> tool is used to view the logfile.

> If configured, NCID also provides yearly call logs in the $HOME/NCID/log/cidcall-&lt;year&gt;.log
> files. Use the [cidcall](http://ncid.sourceforge.net/man/cidcall.1.html) tool to view a yearly
> log file. Review the **Log Files** section for more information.

> [Messages](#message_top)  
> [Aliases](#alias_top)  
> [Hangup](#hangup_top)  
> [Server Extensions](#ext_top)  
> [Command Line Tools](#tools_top)  
> [CallerID Blacklist from FCC Data](#fccdata_top)  
> [Enforcing the North American Numbering Plan](#fakenum_top)  
> [Log Files](#log_top)
