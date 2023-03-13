<!-- Verbose.md - Removable HEADER Start -->

Last edited: Mar 1, 2022  

<!-- Removable HEADER End -->

## <a name="verbose_top"></a>Verbose Levels

> [Table of Contents](#doc_top)

### Index

> * [cidupdate verbose levels](#verbose_cidupdate)
  * [ncid verbose levels](#verbose_ncid)
  * [ncidd verbose levels](#verbose_ncidd)
  * [ncid2ncid verbose levels](#verbose_ncid2ncid)
  * [ncidnumberinfo verbose levels](#verbose_ncidnumberinfo)
  * [obi2ncid verbose levels](#verbose_obi2ncid)
  * [rn2ncid verbose levels](#verbose_rn2ncid)
  * [sip2ncid verbose levels](#verbose_sip2ncid)
  * [wc2ncid verbose levels](#verbose_wc2ncid)
  * [xdmf2ncid verbose levels](#verbose_xdmf2ncid)

### <a name="verbose_cidupdate"></a>cidupdate verbose levels
>  Higher levels include lower levels.

> LEVELR:

        indicate if failed to open call log
        show rename from and to if asking for Y/n
        show result of attempted rename

> LEVELE:

        indicate if no config file
        indicate if there is a config error
        show system error
        show internal program error
        show Terminated on non-option errors

> LEVEL9:

        not used

> LEVEL8:

        exit normally when position in code reached

> LEVEL7:

        not used

> LEVEL6:

        show line fields created

> LEVEL5:

        not used

> LEVEL4:

        changed blacklist #= name
        changed whitelist #= name
        show old cid line

> LEVEL3:

        show write entry to new call log

> LEVEL2:

        not used

> LEVEL1:

        show start time
        show program name and version
        show command line options
        show config file name
        show alias file name
        show blacklist file name
        show whitelist file name
        show simple expresions or posix or perl regular expressions used
             for alias/blacklist/whitelist entries
        indicate alias file messages
        show if ignoring leading 1 in alias definition and calling number
        indicate blacklist and whitelist file messages
        show if ignoring leading 1 in alias definition and calling number
        show if updating current log or current and previous call logs
        show if skipping interactive prompt
        show end line
        show output call log name
        show terminated [by LEVEL8] with date and time

### <a name="verbose_ncid"></a>ncid verbose levels
>  Higher levels include lower levels.

> LEVEL9:

        not used

> LEVEL8:

        not used

> LEVEL7:

        show getField Default clause
        show inserting row in table list
        show DisplayContextMenu mouse clicks
        show $noteFiles tail of contents, and name
        show country code and NTYPE
        show putFlag messages
        show tooltip messages

> LEVEL6:

        show $dataBlock for "CID" when sendCID not called
        show label type for $dataBlock

> LEVEL5:

        show show Assigned numbers for data received from ncidd
        show status of host and port at after each config file and command line

> LEVEL4:

        shows fixed font family detected
        shows fixed font skipped
        shows history window font
        shows message window and display font
        shows help text font
        shows top level window geometry
        display history entries in milliseconds
        clock cannot scan start of call time
        clock cannot scan end of call time
        gateway limitations prevent calculation of duration for a CANCEL CALLINFO

> LEVEL3:

        show all discovered lineids
        show attempting to connect
        show server option received
        indicate if no call array label for phone line label

> LEVEL2:

        display history entries in milliseconds
        indicate rcfile and variable changed
        show all server options received
        indicate saved note to $notefile

> LEVEL1:

        indicate if using PID file or not
        display about
        indicate if a output module is being used and which one
        indicate if optional module variable is not being used
        indicate if optional module variable is being used and ring count
        indicate width of name, number, line type and history window
        display received data if in raw mode
        indicate when call log is completely received
        indicate WRK ACCEPTED or REJECTED  to server
        show "GOODBYE"
        show RELOAD, UPDATE, UPDATES, and REREAD server requests
        show "REQ: PAUSE ..." server requests
        show CIDINFO line on ring count match
        show data sent to module
        show message sent to module
        show CID data sent to module
        show unsupported line labels
        show unsupported alias types
        display popup message
        show discovered lineid's
        show current font
        show number of fixed and total fonts
        show calculated history text field length of message window
        show history text field rows
        indicate window geometry previously not saved or show saved window geometry
        show window geometry
        show window minimum size
        show length of all visible columns in history window
        show number of visible columns out of total number columns
        show resized history field length of message window
        indicate if ncid-alert started in ncid.conf file when autostart is turned on*
        indicate rcfile and variable changed
        indicate unable to save note
        indicate unable to save data in $rcdir because it is a file
        indicate history message and help fonts saved

### <a name="verbose_ncidd"></a>ncidd server verbose levels
>  Higher levels include lower levels.

LEVELR

        indicated received connected signal with date and time
                  when a client connects
                  if no clients are connected

LEVELE

        indicate if no config file
        indicate if there is a config error
        indicate if there is no alias file
        indicate if there is a uname system call error
        indicate if open of ncidd log file failed
        indicate if open of call log failed
        indicate warning using noserial and nomodem in config file
        indicate if there is a set TTY error
        indicate warning if no modem or modem busy
        indicate if open TTY port failed
        indicate if TTY port fcntl error
        indicate if TTY port flush error
        indicate warning using normal hangup if using Announce Hangup
                 and there is no recording file
        indicate what the hangup extension must start with "hangup-"
        indicate if hangup extension not found
        indicate if hangup extension must be executable
        indicate warning using normal mode if modem does not support FAX Hangup
        indicate warning using normal hangup if modem does not support
                 Announce Hangup
        indicate warning using normal hangup if unknown hangup mode
        indicate if unable to parse ifaddress
        indicate if popen failed for cidupdate
        indicate if pclose failed for cidupdate
        indicate if popen failed for ncidutil
        indicate if pclose failed for ncidutil
        indicate if "sh -c" fails to start hangup script
        indicate if hangup script failed to return hangup or OK
        indicate if pclose failed for hangup script
        indicate status of hangup script after trying to run it
        indicate if TTY port lockfile failed to open
        indicate if failed to remove lockfile
        indicate if signal terminated program
        indicate if  if received unexpected signal
        indicate if system error
        indicate if internal program error
        show Terminated with date and time

> LEVEL9:

        (can only be set by the command line)

        show poll() events flag
        show individual tests in strmatch()
        skips LEVEL8

> LEVEL8:

        (can only be set by the command line)

        show alias, blacklist and whitelist tables
        normal exit

> LEVEL7:

        show alias, blacklist and whitelist tables

> LEVEL6:

        indicate client sent empty line
        show optional files failed to open
        indicate sending data to each client
        show progress messages while formatting the phone number
        show progress messages while interpreting the MESG

> LEVEL5:

        display data as a hexdump
        show modem command return codes for hangup
        show lastring and ring count if ring detected
        show processing hangup request

> LEVEL4:

        indicate if name and nmbr received but no date or time
        indicate date, time, nmbr received
        indicate date, time, name or date, time, name, mesg received
        indicate date, time, nmbr, mesg received
        indicate date, time, nmbr, name or date, time, nmbr, name, mesg received
        detected TCI serial device format
        detected NetCallerID or gateway format
        indicate number without RING is Call Waiting (WID)
        show alias matching Begin: and End: with time and result
        show open, Begin, End and exit status for external cidupdate, ncidutil, and hangup scripts 

> LEVEL3:

        show number of tries to init modem
        show modem responses
        show modem query commands for software version, country code, operation modes
        indicate Non 7-bit ASCII message deleted
        indicate Gateway sent CALL data
        indicate Gateway sent CALLINFO data
        indicate client sent text message
        indicate client sent unknown data
        show call data input
        show CID line
        show ACK line
        show calltype, hangup, hupmode, cidline and lineid
        if true, indicate cidline == lineid: check whitelist
        if true, indicate name of number on whitelist: skip hangup check
        if true, show cidline != lineid: skip hangup check
        show checked whitelist and blacklist for match or whitelist empty
        indicate match in blacklist or whitelist with values
        show hangup extension and arguments
        show default mode for hangup extension
        show WARNING: no recording file, using normal hangup (mode 1)
        show using hangup mode
        show using recording
        show hangup extension return code
        show meaning of MESG code if known and discarded
        indicate unable to go off hook to do the hangup
        indicate trouble in going on hook to finish the hangup

> LEVEL2:

        show lines that start with a 3 digit number
        show client connect/disconnect
        indicate if client sent a HELLO Identification line
        indicate if client sent a HELLO Command line
        indicate if client command accepted
        indicate end of client hello lines
        indicate status of call log
        indicate if LineIDS sent to client
        indicate if server options sent to client
        indicate end of cobnnection startup
        indicate hangup pause, hangup not paused, or hangup enabled
        show number of times socket was zero in sequence when trying to remove client from poll
        show client removed on write error
        show client not found in poll table
        indicate network client hung up
        indicate device or modem returned no data
        indicate end of call log or call log empty or no call log sent
        indicate end of connection startup
        show line sent to cidupdate
        show line sent to ncidutil
        show OPT lines
        show REQ: lines
        show INFO: lines
        show WRK: lines
        show RESP: lines
        indicate case where finishCID did not receive full call info


> LEVEL1:

        show started with date and time
        show server version
        indicate if could not create ncidd logfile
        indicate name and location of ncidd logfile
        indicate if no config file or config file processed
        indicate set command skipped in config file
        indicate error in opening ncidd log file
        indicate what is configured to send to the clients
        show verbose level
        indicate data type sent to clients
        indicate alias file messages
        indicate if leading 1 needed for aliases
        indicate blacklist  and whitelist file messages
        indicate alias, blacklist and whitelist total/maximum entries, if any
        indicate cid logfile messages
        indicate of no call logfile
        indicate name and location of call logfile
        indicate if no data logfile
        indicate name and location of data logfile
        show Telephone Line Identifier
        show TTY port opened
        show TTY port speed
        show name and location of TTY lockfile
        show modem query results
        indicate TTY port control signals enabled or disabled
        indicate Caller ID from a serial or USB device and optional gateways
        indicate Caller ID from a modem and optional gateways
        indicate Handles modem calls without Caller ID
        indicate Does not handle modem calls without Caller ID
        indicate Caller ID from gateways without modem support
        indicate hangup option
        show network port
        indicate not using PID file if no '-P' option
        indicate pid file already exists
        indicate found stale pidfile
        indicate cannot write pidfile
        indicate wrote pid in pidfile
        indicate end of startup
        indicate TTY in use with date and time
        indicate TTY free with date and time
        indicate cannot init TTY and terminated with date and time
        indicate Modem initialized.
        indicate Initialization string for modem is null.
        indicate Modem Chipset version
        indicate Modem set for CallerID.
        indicate Modem set for CallerID and Call Waiting.
        indicate Modem does or does not support FAX
        indicate Modem supports Snooping for call waiting
        indicate CallerID initialization string for modem is null.
        indicate CallerID TTY port initialized
        indicate serial device hung up and terminated with date and time
        indicate device error and terminated with date and time
        indicate serial device error and terminated with date and time
        indicate poll error
        indicate invalid request from serial device, terminated with date and time
        indicate Invalid Request, removed client
        indicate Write event not configured, removed client
        indicate device or modem read error
        indicate Device returns no data, Terminated with date and time
        indicate network connect error
        indicate network NOBLOCK error
        indicate too many network clients
        indicate network client read error
        indicate cid log is too large
        indicate sending log to client
        indicate removed pidfile
        indicate signal received and terminate program with date and time
        indicate SIGHUP received and reload alias files
        indicate SIGPIPE received and ignored with date and time
        indicate Failed to remove stale lockfile
        indicate Removed stale lockfile
        indicate success or failure to parse ifaddr to set the interface
        indicate which country code is set for number formatting
        show number display format selected if country is NANPA
        show error in rstarting external cidupdate, ncidutil, and hangup scripts 
        indicate hangup script did not return hangup or OK

### <a name="verbose_ncid2ncid"></a>ncid2ncid gateway verbose levels
>  Higher levels include lower levels.

> LEVELE

        indicate if no config file
        indicate if there is a config error
        show gethostname error

> LEVEL9:

        (can only be set by the command line)
        not used

> LEVEL8:

        (can only be set by the command line)
        not used

> LEVEL7:

        not used

> LEVEL6:

        not used

> LEVEL5:

        not used

> LEVEL4:

        indicate reading socket
        show call log lines received

> LEVEL3:

        show all data received from all servers

> LEVEL2:

        indicate line sent to receiving NCID server
        indicate line from receiving NCID server

> LEVEL1:

        indicate cannot create or open existing logfile
        show start date and time
        show server version
        show command line
        indicate Debug mode
        indicate no config file or config file processed
        indicate set command skipped in config file
        show HELLO: IDENT:
        show HELLO: CMD:
        show error line in config file
        show verbose level
        indicate not using PID file, there was no '-P' option
        indicate found stale pidfile
        indicate wrote pid in pidfile
        show Receiving Host host:port
        show server greeting line
        show configured Sending Hosts host:port
        show configured servers greeting line
        indicate client disconnected
        indicate client reconnected
        indicate Hung Up
        indicate Poll Error
        indicate Removed client, invalid request
        indicate Removed client, write event not configured
        indicate line cannot be sent to receiving NCID server
        indicate removed pidfile
        show terminated with date and time

### <a name="verbose_ncidnumberinfo"></a>ncidnumberinfo verbose levels
>  Higher levels include lower levels.

> LEVELE:

        indicate if a phone number must be given
        show usage for adding a phonenumber
        show system error
        show internal program error
        show Terminated on non-option errors

> LEVEL9:

        not used

> LEVEL8:

        exit normally when position in code reached

> LEVEL7:

        not used

> LEVEL6:

        not used

> LEVEL5:

        not used

> LEVEL4:

        not used

> LEVEL3:

        show raw telephone number

> LEVEL2:

        not used

> LEVEL1:

        show start time
        show program name and version
        show command line options
        show verbose level
        indicate NANP country format used
        show terminated [by LEVEL8] with date and time

### <a name="verbose_obi2ncid"></a>obi2ncid gateway verbose levels
>  Higher levels include lower levels.

> LEVEL9:

        not used

> LEVEL8:

        not used

> LEVEL7:

        show call log from ncidd, if received

> LEVEL6:

        indicate start and end of received packets
        filter received packets

> LEVEL5:

        show call or message line from ncidd
        show log lines received from the obi

> LEVEL4:

        show what matched on a log line from the obi
        show variables set by the match

> LEVEL3:

        show CALL: line generated
        show CALLINFO: line generated
        indicate Outgoing call not completed

> LEVEL2:

        not used

> LEVEL1:

        show Started
        show command line and any options on separate lines
        show logfile name and opened as append or overwrite or could not open
        show processed config file or config file not found
        show name and version
        show verbose level
        show Hostname flag
        show IDENT
        show Command
        show Line ID
        show NCID address:port
        show delay time between retrying failed connection
        show debug mode if in debug mode
        show test mode if in test mode
        show PID or some PID problem or not using PID file
        show connected to NCID <address:port> or error exit
        show greeting line from NCID
        show listening port or error exit
        show exit on error
        show signals ingnored
        show NCID server disconnected if it goes away and trying to reconnect
        show terminated and signal that caused it

### <a name="verbose_rn2ncid"></a>rn2ncid gateway verbose levels
>  Higher levels include lower levels.

> LEVEL9:

        not used

> LEVEL8:

        not used

> LEVEL7:

        not used

> LEVEL6:

        not used

> LEVEL5:

        show call log from ncidd, if received
        show call or message line from ncidd
        show messgae line from remote notification

> LEVEL4:

        not used

> LEVEL3:

        show notification type
        show Call: line generated if type RING
        show NOT: line generated if type PING, Battery, SMS, MMS, or VOICEMAIL
        show notice of a SMS or MMS message
        show unknown notification type
        show notification type was rejected

> LEVEL2:

        not used

> LEVEL1:

        show Started
        show command line and any options on separate lines
        show logfile name and opened as append or overwrite or could not open
        show processed config file or config file not found
        show name and version
        show verbose level
        show HELLO: IDENT:
        show HELLO: CMD:
        show Line ID
        show debug mode if in debug mode
        show test mode if in test mode
        show reject option values or none
        show pid or some PID problem
        show connected to NCID <address:port> or error exit
        show greeting line from NCID
        show delay between each try to reconnect to server
        show listening port or error exit
        show NCID server disconnected if it goes away and trying to reconnect

### <a name="verbose_sip2ncid"></a>sip2ncid gateway verbose levels
>  Higher levels include lower levels.

> LEVEL9:

        (can only be set by the command line)

        show lines received from the NCID server

> LEVEL8:

        not used

> LEVEL7:

        not used

> LEVEL6:

        not used

> LEVEL5:

        not used (reserved for hex dumps)

> LEVEL4:

        show startup lines from server
        show packet from and to addresses
        show packet source and destination ports
        show packet data size in bytes
        show linenum array and contact as they are compared for an INVITE
        indicate checked for outgoing call
        show INVITE contact was not registered for out call
        indicate Alarm Timeout and msgsent flag
        show call log if sent
        show Loopback encapsulation type

> LEVEL3:

        show SIP packets
        give character count of lines received from the NCID server
        show protocol information for the packet
        show warning SIP packet truncated
        indicate examining packet for line label
        indicate number, or name and number, in packet
        show alarm timeout, pcap\_loop() return value and msgsent flags
        show calls table search, additions and deletions

> LEVEL2:

        show CALL and CALLINFO lines
        show packet number received and date
        show request line
        show outgoing call
        show cidmsg log line generated
        show trying responses
        show Warning: could not connect to the NCID server

> LEVEL1:

        indicate cannot create or open existing logfile
        show start date and time
        show server and API versions
        indicate test mode
        indicate Debug mode
        indicate no config file
        indicate config file processed
        indicate set command skipped in config file
        show error line in config file
        indicate Reading from dumpfile
        indicate Writing to dumpfile
        show verbose level
        show HELLO: IDENT:
        show HELLO: CMD:
        show Line ID
        show status: Warn clients: 'No SIP packets' & 'SIP packets returned'
        show NCID status
        show network interface used
        show applied filter
        indicate no filter applied
        indicate No SIP packets received
        indicate SIP packets returned
        indicate not using PID file, there was no '-P' option
        indicate pid file already exists
        indicate found stale pidfile
        indicate wrote pid in pidfile
        alarm SIP packets returned
        Warning: SIP Packet truncated
        Warning: simultaneous calls exceeded
        invalid IP header length
        show registered line number
        indicate Number of telephone lines exceeded
        show CID line sent to NCID
        indicate packet parse problems
        indicate caller hangup before answer
        indicate hangup after answer
        Warning: cannot get CallID
        Warning: Warning no SIP packets
        indicate pcap_loop error
        indicate removed pidfile
        indicate program terminated with date and time
        show extension size
        show pcap linktype for the device

### <a name="verbose_wc2ncid"></a>wc2ncid gateway verbose levels
>  Higher levels include lower levels.

> LEVEL9:

        not used

> LEVEL8:

        not used

> LEVEL7:

        not used

> LEVEL6:

        not used

> LEVEL5:

        show call log from ncidd, if received
        show Caller ID line from ncidd

> LEVEL4:

        show hex dump of received packet

> LEVEL3:

        show unit and serial numbers from Whozz Calling device
        show Call line from Whozz Calling device

> LEVEL2:

        show CALL and CALLINFO lines sent to ncidd
        show Phone Off Hook
        show Phone On Hook

> LEVEL1:

        show Started
        show command line and any options on separate lines
        show name and version
        show verbose level
        show debug mode if in debug mode
        show test mode if in test mode
        show logfile name and whether opened as append or overwrite
        show logfile could not be opened
        show processed config file or config file not found
        show Trying to connect to <ipaddr>:<port>
        show Connected to NCID server at <ipaddr>:<port
        show Hostname flag
        show IDENT
        show discovered WV devices if more than 1
        show Device WC-<number> at address
        show Sent ^^Id-Z<mmddhhmm>" to <IPaddress>:<port> to set internal clock
        show Command
        show connected to NCID <address:port> or error exit
        show greeting line from NCID
        show opened broadcast port
        show closed broadcast port
        show opened WC device port
        show closed WC device port
        show commands sent
        show Pause after sending ^^Id-V
        show checking and setting required flags
        indicate command data received or timeout in seconds
        show data from some commands
        show Waiting for calls from <server:port>

### <a name="verbose_xdmf2ncid"></a>xdmf2ncid gateway verbose levels
>  Higher levels include lower levels.

> LEVEL9:

        not used

> LEVEL8:

        not used

> LEVEL7:

        not used

> LEVEL6:

        indicate start and end of received packets
        filter received packets

> LEVEL5:

        show call log from ncidd, if received
        show call or message line from ncidd

> LEVEL4:

        indicate U counts from Holtek HT9032D
        show Hex Dump of Message
        indicate <SDMF|XDMF> packet and bytes to checksum
        show Message Length
        show Calculated Checksum Good
        show Got Call Type
        show Got Date & Time
        show Got Caller Number
        show Got Why No Number
        show Got Caller Name
        show Got Why No Name
        show Got unknown
        show Detected Call type

> LEVEL3:

        indicate data received from Holtek HT9032D
        indicate Ignored Holtek HT9032D noise packet
        indicate detected Comet device
        indicate ASCII Hex detected
        indicate Detected XDMF Hex message
        show Received Message
        show Calculated Checksum Bad, if bad
        show Call line sent to server
        indicate ERROR - not an XDMF packet

> LEVEL2:

        not used

> LEVEL1:

        show Started
        show command line and any options on separate lines
        show logfile name and opened as append or overwrite or could not open
        show processed config file or config file not found
        show name and version
        indicate configured for Holtek HT9032D
        indicate configured for a Comet or modem
        show verbose level
        show Hostname Flag
        show HELLO: IDENT:
        show HELLO: CMD:
        show Line ID
        show NCID <address:port>
        show delay time between retrying failed connection
        show <ttyport>
        show debug mode if in debug mode
        show test mode if in test mode
        show PID or some PID problem or not using PID file
        show connected to NCID <address:port> or error exit
        show greeting line from NCID
        show Connected to USB port <ttyport>
        show Waiting for calls from <ttyport>
        show exit on error
        show signals ingnored
        show NCID server disconnected if it goes away and trying to reconnect
        show terminated and signal that caused it

