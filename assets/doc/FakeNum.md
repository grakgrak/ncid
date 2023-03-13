<!-- FakeNum.md - Removable HEADER Start -->

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

Last edited: August 12, 2019

<!-- Removable HEADER End -->

## <a name="fakenum_top"></a> Enforcing the North American Numbering Plan

> [Table of Contents](#doc_top)

> [Description](#fakenum_des)   
> [Requirements](#fakenum_req)   
> [Background](#fakenum_back)  
> [Configure NCID](#fakenum_config-ncid)   
> [Configure get-areacodes-list for Periodic Update](#fakenum_crontab)   

### <a name="fakenum_des"></a> Description

> The North American Numbering Plan has some rules which many spam callers
have not figured out, or can not duplicate.

> When used with a modem ([see the Hangup Overview](#hangup_ov)), **ncidd** 
  can use this to hang up on unwanted callers.

> optionally, a **get-areacodes-list** script, run periodically, updates a
  list of valid area codes. 



### <a name="fakenum_req"></a> Requirements

> - [NCID](ncid/ncid.html) release 1.7 or newer
> - a modem to do the hangup
> - ten digit caller ID

> Creating and updating the list of valid area codes requires:

> - internet connection
> - **wget** -  fetches files using http

### <a name="fakenum_back"></a> Background

> Many calling phone numbers do not exist in North America. Spam callers from
distant places don't seem to know this and call with area codes like 000 or exchange
codes like 111.

> In addition, spam callers appear to have difficulty filling in the caller ID
name field. This will show up as something like V1234567890 or be the same as the
calling number.
Phone companies supply text like A SMITH for the name, so **hangup-fakenum**
disallows numeric names.

> The **hangup-fakenum** extension runs after the built-in aliases, and the configured
aliases in **ncidd.alias** have been applied. The whitelist is checked, then (if
hangup is enabled) the blacklist, then (if hupmode is enabled) the extension script.


### <a name="fakenum_config-ncid"></a> Configure NCID

> Hangup Extension  
>
>>
>> 1. Configure the NCID server to use [Hangup Extensions](#ext_hup) as 
>>    explained in the [**User Manual**](#ext_hup). Specify **hangup-fakenum** 
>>    as the name of the extension (or chain some extensions together with hangup-combo). 
>> 2. Add a list of valid area codes by running **get-areacodes-list** once and then schedule it for periodic update.

>>
>>          sudo /usr/share/ncid/sys/get-areacodes-list
>>
>>  or  
>>  
>>          sudo /usr/local/share/ncid/sys/get-areacodes-list

### <a name="fakenum_crontab"></a> Configure get-areacodes-list for Periodic Update

> You might want to run **get-areacodes-list** as a repeated background task. The
area codes do not change very often.

> - Linux/UNIX - use **cron** and log activity to `/tmp/get-areacodes-list.log`

>> 1. Run the **crontab** editor as root:  
>>
>>                 sudo crontab -e  
>>
>> 2. Add two new lines at the end:
>>       
>>>       
>>>       # run 2x yearly at 08:15  
>>>       
>>>       15 08 3 6,12 *   /usr/share/ncid/sys/get-areacodes-list \
>>>                     > /tmp/get-areacodes-list.log 2>&1
