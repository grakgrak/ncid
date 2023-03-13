<!-- FCCData.md - Removable HEADER Start -->

<style>
th {
   white-space: nowrap;
}

table, th, td {
   padding: 6px 13px;
   border: 1px solid #DDD;
   border-collapse: collapse;
   border-spacing: 0px;
}
</style>

Last edited: August 9, 2021

<!-- Removable HEADER End -->

## <a name="fccdata_top"></a> CallerID Blacklist from FCC Data

> [Table of Contents](#doc_top)

> [Description](#fccdata_des)   
> [Requirements](#fccdata_req)   
> [Background](#fccdata_back)   
> [How FCC Data Retrieval Works](#fccdata_script)   
> [Configure NCID](#fccdata_config-ncid)   
> [Configure get-fcc-list for Periodic Update](#fccdata_crontab)   

# <center>![Angry stick figure](images/FCCData.png "This guy is unhappy about having gotten up from the couch for a telemarketer")</center>


### <a name="fccdata_des"></a> Description

> The FCC gets many complaints about unwanted callers and makes a summary
  available to the public. We refer to this summary as the *FCC Data*.

> When used with a modem ([see the Hangup Overview](#hangup_ov)), **ncidd** 
  can use this information as a blacklist to hang up on unwanted North 
  American callers.

> A **get-fcc-list** script, run periodically, fetches this data from an 
  intermediate web server.

> The FCC Data can be used with the NCID server's Internal Hangup and 
  Hangup Extensions.


### <a name="fccdata_req"></a> Requirements

> - [NCID](ncid/ncid.html) release 1.7 or newer
> - a modem to do the hangup
> - internet connection
> - **wget** -  fetches files using http
> - **pkill** - send signal to all running ncidd servers to reload alias, 
    blacklist and whitelist

### <a name="fccdata_back"></a> Background

> On Oct 21, 2015, the United States Federal Communications Commission (FCC)
 [announced](https://www.fcc.gov/document/fcc-releasing-data-support-robocall-blocking-technologies)
 (archived [here](http://archive.is/https://www.fcc.gov/document/fcc-releasing-data-support-robocall-blocking-technologies) or [here](http://archive.is/sMhIQ))
 they would be releasing weekly data to support robocall blocking technologies. 
 
> On May 23, 2016, the FCC
 [announced](https://consumercomplaints.fcc.gov/hc/en-us/articles/205239443-Data-on-Unwanted-Calls)
 (archived [here](http://archive.is/https://consumercomplaints.fcc.gov/hc/en-us/articles/205239443-Data-on-Unwanted-Calls) or [here](http://archive.is/xv2S6))
   a new method for us to obtain the information.
  It appears to be updated in either real time or daily.

> You may also 
[go to the FCC's site and add your own complaints.](https://consumercomplaints.fcc.gov/hc/en-us/articles/115002234203-Unwanted-Calls)

> The FCC Data is a huge spreadsheet available from the FCC's Open Data
  project. It has a row for each complaint received about annoying phone 
  callers going back to October 2014.

> The spreadsheet is growing larger as complaints arrive at a rate of 
  around 500 per day. There is a lot of information that we don't care 
  about and some complaint types that don't involve phone calls.

>You can find the CGB - Consumer Complaints Data at
<https://opendata.fcc.gov/Consumer/CGB-Consumer-Complaints-Data/3xyp-aqkj>
	
> The original NCID script to fetch and analyze the complaints data was 
  written by Mike Stember. It was named **FCC2ncid**.
  
> A change in the FCC's data caused **FCC2ncid** to stop finding new 
  numbers after October 2016, so it has been replaced by **get-fcc-list**.

### <a name="fccdata_script"></a> How FCC Data Retrieval Works

> Every day at around 7:11AM EST, an intermediate web server downloads the
  FCC's large dataset. By performing the following
  processing, the intermediate  web server reduces 
  a 22 megabyte download to a more manageable 
  195,000 bytes:

> - duplicates are merged together and counted
> - only numbers reported three or more times are included
> - numbers which have been inactive for 600 days are excluded
> - the resulting list is sorted and stored as `fcc.blacklist`

> Each installation of NCID can run a local copy of the **get-fcc-list** 
  script to fetch `fcc.blacklist`. 

> If the script is configured for use with NCID Hangup Extensions 
  (usually **hangup-fcc**), no further processing is needed.

> If the script is configured for use with the NCID server's Internal 
  Hangup, it performs the following additional steps:

> - backs up the existing `ncidd.blacklist` into `/var/backups/ncid/`
> - deletes the old FCC data from `ncidd.blacklist`
> - appends the latest FCC data to `ncidd.blacklist`
> - signals **ncidd** to reread the alias, blacklist and whitelist files

### <a name="fccdata_config-ncid"></a> Configure NCID

> Choose one of the following:

> - Internal Hangup  
>
>> File `fcc.blacklist` is appended to `ncidd.blacklist`. This method 
   allows NCID clients (e.g., NCIDpop, NCID Android) to query the blacklist.  
>>
>> 1. Configure the NCID server to use [Internal Hangup](#hangup_ov) as 
      explained in the [**User Manual**](#hangup_ov).  
>> 2. Configure **get-fcc-list** for periodic update with the *-a* (append) option.

> - Hangup Extension  
>
>>  File `fcc.blacklist` is used as-is by the Hangup Extension. This 
    method has a smaller memory footprint and is more modular.
>>
>> 1. Configure the NCID server to use [Hangup Extensions](#ext_hup) as 
>>    explained in the [**User Manual**](#ext_hup). Specify **hangup-fcc** 
>>    as the name of the extension.  
>> 2. Configure **get-fcc-list** for periodic update with the *-n* (no append) option.

> If you wish to transition from using the FCC Data with Internal Hangup 
> to using Hangup Extensions:  
> 
>- Run **get-fcc-list** as root, just once, from the command line, using 
   the *-r* option. 
>
>> This will backup the current `ncidd.blacklist`, remove old FCC Data 
   lines and force the server to reread the modified `ncidd.blacklist`.  
>
>- You must specify the full path to the script.  

>>
>>          sudo /usr/share/ncid/sys/get-fcc-list -r  
>>
>>  or  
>>  
>>          sudo /usr/local/share/ncid/sys/get-fcc-list -r  

### <a name="fccdata_crontab"></a> Configure get-fcc-list for Periodic Update

> You likely want to run **get-fcc-list** as a daily background task. It 
  is suggested that it be run at 08:15AM local time.

> - Linux/UNIX - use **cron** and log activity to `/tmp/get-fcc-list.log`

>> 1. Run the **crontab** editor as root:  
>>
>>                 sudo crontab -e  
>>
>> 2. Add two new lines at the end depending on the hangup method:
>> 
>>>- Internal Hangup - append (-a) FCC Data to `ncidd.blacklist`  
>>>
>>>>
>>>>       # run 1x each day at 08:15  
>>>>
>>>>       15 08 * * *   /usr/share/ncid/sys/get-fcc-list -a \
>>>>                     > /tmp/get-fcc-list.log 2>&1
>>>       
>>>- Hangup Extension - do not append (-n), use `fcc.blacklist` as-is  
>>>
>>>>       
>>>>       # run 1x each day at 08:15  
>>>>       
>>>>       15 08 * * *   /usr/share/ncid/sys/get-fcc-list -n \
>>>>                     > /tmp/get-fcc-list.log 2>&1
