<!-- Devices.md - Removable HEADER Start -->

Last edited: March 30, 2022  

<!-- Removable HEADER End -->

## <a name="devices_top"></a>Devices Supported

> [Table of Contents](#doc_top)

### Devices Index

> * [Modems](#devices_modem)  
> * [ATA (Analog Terminal Adapter)](#devices_ata)  
> * [CTI Comet USB device](#xdmf_ct)  
> * [Holtek HT9032D based PSTN Caller ID module](#xdmf_ht)  
> * [NetCallerID serial device](#devices_id)  
> * [Tel-Control, Inc. (TCI) serial devices](#devices_tci)  
> * [Whozz Calling serial devices](#devices_swc)  
> * [Whozz Calling Ethernet Link devices](#devices_wc)  
> * [Obihai VoIP Telephone Adapters and IP Phone](#devices_obi)  

<br>

### <a name="devices_modem"></a>Modems

> Modems are normally used to obtain the Caller ID. They can also be used dial a number or
  hangup on a call.
  NCID supports up to 5 modems or serial devices.
  
> Any Caller ID serial or USB modem supported by the operating system
  can be used.
  See [Incomplete list of working modems](https://en.wikipedia.org/wiki/Network_Caller_ID).

> NCID can also use those rare modems that do not support Caller ID by configuring *gencid*
  in **ncidd.conf**, but such modems are limited to indicating the date and start time of the calls.
  If a [Gateway](#gateways_top) is used to obtain the Caller ID these modems can be used to dial
  a number and hangup on a call.

> See the modem [Configuration](#modems_mconf) section for information on
  configuring modems.

<br>

### <a name="devices_ata"></a>ATA (Analog Terminal Adapter)

> The ATA hardware is for VoIP (Voice over Internet Protocol).

> VoIP telephone services use an Analog Terminal Adapter, sometimes
  called a VoIP gateway.

> See also [Voip-info.org: A reference guide to all things VOIP](http://www.voip-info.org/wiki/view/ATA).

> In order to receive Caller ID from VoIP, the local network must be
  configured. Three configurations are considered here:

> - [One device: Cable/DSL Modem with integrated ATA device](#devices_d)
> - [Two devices: Cable/DSL Modem + Router Switch with integrated ATA device](#devices_mr)
> - [Three devices: Cable/DSL Modem + Router Switch + ATA device](#devices_mrd)

> #### <a name="devices_d"></a>One device: Cable/DSL Modem with integrated ATA device

> Many cable companies such as Comcast and Time Warner now offer bundled
  services, referred to in the industry as "triple play service." This
  delivers television, Internet service and digital phone service via
  a single device.

> The protocol used for the digital phone service is usually proprietary.

> *NCID is not supported in this configuration.*

> #### <a name="devices_mr"></a>Two devices: Cable/DSL Modem + Router Switch    with integrated ATA device

> These router and ATA combo devices may be configured to put the Caller ID 
  on the built-in switch. If you have other routers working, please 
  contribute to this list:

>> 
<b>Router |  Model  | Settings | Configuration</b> 
----------|---------|:--------:|:----------------- 
Linksys   | WRTP54G |    -     |(has "P" in model name) <br> use Vonage Talk
Linksys   | RT31P2  |   DMZ    |put computer IP address in the DMZ

> #### <a name="devices_mrd"></a>Three devices: Cable/DSL Modem + Router Switch + ATA device

> A stand-alone ATA device connected to your network will make its Caller ID
   info (Session Initiation Protocol, or SIP) available to all the other
   network devices that are listening for it. A typical setup has the ATA
   connected to one physical port on the router/switch and the computer
   running NCID is connected to a different physical port. Most modern
   routers/switches isolate the network traffic on any one physical port
   from all the other physical ports. This is done on purpose to optimize
   network traffic throughput and provide better performance.

> The problem is that having the network traffic isolated in this way does
   not allow the NCID computer to ever receive the Caller ID info from the
   ATA.

> To circumvent this problem, you have several options:

> A. Use an [Ethernet Tap](http://en.wikipedia.org/wiki/Network_tap).

>> This is the preferred method to obtain Caller ID. The 
   [USB Powered 5-Port 10/100 Ethernet Switch TAP](http://www.dual-comm.com/port-mirroring-LAN_switch.htm)
   by Dualcomm is a good choice and has been successfully used with NCID.
   The Dualcomm USB powered 5-port Ethernet Switch TAP mirrors all
   ethernet traffic on port 1 to port 5. Simply plug your ATA into port 1
   and your NCID server into port 5. 

>> + The NCID server and ATA need to be (relatively) close together 
     in order to connect directly to the ethernet TAP.
>> + Requires no software configuration beyond the sip2ncid setup.
>> + Requires additional hardware.

> B. Use [port mirroring](https://en.wikipedia.org/wiki/Port_mirroring).

>> Port mirroring is not port *forwarding*.

>> + Requires [DD-WRT](http://www.dd-wrt.com), [OpenWRT](https://openwrt.org), or similar Linux-based OS to be running on your home router.
>> + Requires manual configuration of the port mirror on your home router.
>> + Any modification to the firewall rules or QoS settings in DD-WRT 
     will result in the port mirroring commands being discarded; you will
     either have to reboot DD-WRT or manually enter the commands via SSH 
     to restart the port mirror.
>> + The NCID server and ATA can be located anywhere on your home network.
>> + No additional hardware needed.

>> STEPS TO CONFIGURE DD-WRT
>>
>>> &#x31;. Use ssh to connect to your router and enter the following port
>>> mirroring commands, substituting your values for *ip-of-sip-ata* and 
>>> *ip-of-ncid-server*:
>>> 
>>>>     iptables -t mangle \
>>>>              -A POSTROUTING \
>>>>              -d ip-of-sip-ata \
>>>>              -j ROUTE \
>>>>              --tee --gw ip-of-ncid-server
>>>>
>>>>     iptables -t mangle \
>>>>              -A PREROUTING \
>>>>              -s ip-of-sip-ata \
>>>>              -j ROUTE \
>>>>              --tee --gw ip-of-ncid-server

>>> &#x32;. To verify the port mirror is setup properly, use:

>>>>     iptables -t mangle -L -v -n

>>>> which will provide output that should show something similar to:

>>>>     Chain PREROUTING (policy ACCEPT 4510K packets, 2555M bytes)
>>>>     pkts bytes target prot opt in out source destination
>>>>     ....
>>>>     219 152K ROUTE 0 -- * * ip-of-sip-ata 0.0.0.0/0 ROUTE gw:ip-of-ncid-server tee
>>>>     ....
>>>>
>>>>     Chain POSTROUTING (policy ACCEPT 17M packets, 7764M bytes)
>>>>     pkts bytes target prot opt in out source destination
>>>>     ....
>>>>     206 82184 ROUTE 0 -- * * 0.0.0.0/0 ip-of-sip-ata ROUTE gw:ip-of-ncid-server tee
>>>>     ....

>>> &#x33;. Follow the sip2ncid setup instructions to make sure that SIP 
>>> packets are being received.
>>>
>>> &#x34;. When everything is working properly, add the port mirroring 
>>> commands to the DD-WRT startup commands in the Management tab so that 
>>> they will be run whenever DD-WRT is rebooted.

<!--
# https://en.wikipedia.org/wiki/Ettercap_(software)
# https://www.w3schools.com/tags/ref_urlencode.asp
-->

> C. Use [Ettercap](https://en.wikipedia.org/wiki/Ettercap%5F%28software%29).

>> Convince your router to send all SIP packets to your NCID server
>> and have your NCID server pass the packets on to your ATA.  This is most
>> easily and robustly accomplished through the use of [ettercap](http://www.ettercap-project.org).

>> + If the NCID server or ettercap fails, your router and SIP ATA will
     automatically start communicating directly within a few minutes as the 
     SIP ATA and router are not physically isolated.
>> + The NCID server and ATA can be located anywhere on your home network.
>> + No manual configuration of router is required.
>> + No additional hardware needed.

>> STEPS TO CONFIGURE ETTERCAP
>>
>>> Perform these steps from a command prompt on your NCID server.
>>
>>> &#x31;. To determine the proper *interface* for ettercap to use, `ifconfig`
>>> will show all available interfaces. For example, wired ethernet is eth0 
>>> and wireless ethernet is wlan0 on Raspbian.

>>> &#x32;. Install ettercap.  

>>> - if on Ubuntu, Raspbian and other Debian-based systems:
>>>
>>>>     sudo apt-get install ettercap-text-only
>>>>

>>> - if on Fedora and other Redhat-based systems:
>>>
>>>>     sudo dnf install ettercap
>>>>

>>> &#x33;. Execute ettercap, substituting your values for *interface*, 
>>> *ip-of-sip-ata* and *ip-of-home-router*. The forward slashes are
>>> mandatory.

>>> - if using IPV4, surround each IP address with one leading slash and
>>> one trailing slash:

>>>>       sudo ettercap -T -D -i interface -M arp:remote \
>>>>                     /ip-of-sip-ata/ /ip-of-home-router/

>>> - if using IPV6, surround each IP address with *two* leading slashes and
>>> one trailing slash:
>>> 
>>>>       sudo ettercap -T -D -i interface -M arp:remote \
>>>>                     //ip-of-sip-ata/ //ip-of-home-router/

>>> &#x34;. Follow the sip2ncid setup instructions to make sure that SIP packets are being received.

>>> &#x35;. You will want to add ettercap to your operating system startup
>>> sequence. Steps to do this vary depending on distribution and even 
>>> depending on the version of a specific distribution. Consult your operating
>>> system documentation on how to do this.

> D. Install SIP client on NCID server.

>> If none of the above options are possible on your network, a SIP 
>> client can be installed on the NCID server to attract incoming call 
>> information to the NCID server. It is best practice to create a new 
>> extension number for the NCID server's SIP client and for access 
>> control to be configured on the voice gateway to prevent this extension 
>> from dialing out. Multiple command-line SIP clients are available, 
>> but it should be simple to install and use 
>> [Linphone](http://www.linphone.org/).

>> STEPS TO CONFIGURE LINPHONE
>>
>>> Perform these steps from a command prompt on your NCID server.
>>
>>> &#x31;. Install linphone.

>>> - if on Ubuntu, Raspbian and other Debian-based systems:

>>>>       sudo apt-get install linphone
>>>>

>>> - if on Fedora and other Redhat-based systems:
>>>
>>>>       sudo dnf install linphone
>>>>

>>> &#x32;. Execute linphone.
>>>
>>>>     linphonecsh init 
>>>>     
>>>>     linphonecsh register \
>>>>                 --host <ip of gateway> \
>>>>                 --username <extension number/username> \
>>>>                 --password <password>

>>> &#x33;. Follow the sip2ncid setup instructions to make sure that SIP 
>>> packets are being received.

> E.  Use an [Ethernet *hub*](http://en.wikipedia.org/wiki/Ethernet_hub).
>> (Historical, not recommended)

>> Ethernet hubs pre-date [Ethernet switches](https://en.wikipedia.org/wiki/Network_switch)
>> and do not isolate network traffic between physical ports. Ethernet
>> switches have largely rendered Ethernet hubs obsolete. Some Ethernet
>> hubs manufactured today are actually Ethernet switches in disguise.
>> See the [hub reference](http://wiki.wireshark.org/HubReference)
>> to determine if a hub is really a hub.

> F. Use a router that supports SIP ALG ([Application-level gateway](http://www.voip-info.org/wiki/view/Routers+SIP+ALG)). 
>> (Historical, not recommended)

>> Unfortunately, not all routers implement ALG correctly. The following
>> routers are known to use ALG properly with NCID. If you have other
>> routers working, please contribute to this list:

>>>
<b>Router |  Model  | Settings | Configuration</b>
----------|---------|:--------:|:-----------------
Linksys   | WRT54G  |    -     |(no "P" in model name) <br> SIP packets on port 5060 may need a firmware update if the firmware version is below 1.00.6. See [this link](http://www.voip-info.org/wiki-Linksys+WRT54G) for firmware info.
Linksys   | RVS4000 | L2 Switch| Assuming gateway is port #1 and NCID SIP gateway is monitoring port #2: mirror port #1 to port #2  

### <a name="xdmf_ct"></a>CTI Comet USB device

> The [CTI Comet USB](http://www.crucible-technologies.co.uk/products/WEB-COMET) is a Caller ID
  device with USB connectivity.  This product is powered entirely from the USB port. It is a
  hardware only product and can be used with your NCID software to track incoming calls.

> A traditional modem communicates with ncidd using ASCII text data, but the CTI Comet USB uses binary 
  data so ncidd cannot monitor it directly. Instead, the CTI Comet USB is monitored by the **xdmf2ncid** 
  gateway.

> The ncidd server must be configured to use it.  The server normally assumes a modem is going to 
  be used so it must be configured to use a gateway instead.
  
> Refer to the [xdmf2ncid setup](#gateways_xdmf) in the [Gateways](#gateways_top) section to 
  configure NCID to work with the CTI Comet USB.

<br>

### <a name="xdmf_ht"></a>Holtek HT9032D based PSTN Caller ID module

> The [Holtek HT9032D based PSTN Caller ID module](https://www.aliexpress.com/item/-/32807442435.html) is a Caller ID
  device with USB connectivity achieved by the [USB to UART TTL cable adapter](https://www.aliexpress.com/item/-/1859099599.html).
  As such this product is powered entirely from the USB port.
  It can be used with your NCID software to track incoming calls.

> A traditional modem communicates with ncidd using ASCII text data, but the Holtek HT9032D based PSTN Caller ID module 
  uses binary data so ncidd cannot monitor it directly. Instead, the Holtek HT9032D based PSTN Caller ID module is 
  monitored by the **xdmf2ncid** gateway.

> The ncidd server must be configured to use it.  The server normally assumes a modem is going to 
  be used so it must be configured to use a gateway instead.
  
> Refer to the [xdmf2ncid setup](#gateways_xdmf) in the [Gateways](#gateways_top) section to 
  configure NCID to work with the Holtek HT9032D based PSTN Caller ID module.

<br>

### <a name="devices_id"></a>NetCallerID serial device

> The NetCallerID device is used in place of a modem. It is no longer manufactured by 
  Ugotcall (archived info [here](https://web.archive.org/web/20021013090851/http://ugotcall.com:80/nci.htm)
  and [here](https://www.amazon.com/Ugotcall-NC2001-Net-Caller-NetcallerID/dp/B005VTHD8M))
  but you can sometimes find it on eBay.

> The ncidd server must be configured to use it.  The server normally
  assumes a modem is going to be used so it must be configured to use
  a serial NetCallerID device that does not use AT commands.

> Uncomment these lines in **ncidd.conf** (this assumes the device is connected
  to serial port 0):

>>      # set ttyport = /dev/ttyS0    # Linux Serial Port 0
>>      # set ttyspeed = 4800         # NetCallerID port speed
>>      # set cidinput = 1


> Here are the specifications of the NetCallerID device:

>> ttyport:

>>>      4800 8N1

>> Output Format:

>>>      ###DATE08082225...NMBR14075551212...NAMEJOHN+++\r
>>>      ###DATE...NMBR...NAME   -MSG OFF-+++\r

<br>

### <a name="devices_tci"></a>Tel-Control, Inc. (TCI) serial devices

> TCI caller ID units are used in place of one or more modems. 
  The company is no longer in business, but you can sometimes 
  find units on eBay or at telephone equipment liquidators. As an
  alternative, Whozz Calling serial devices are direct replacements
  for TC-1041, MLX-41, TC-1082 and MLX-42 units. NCID has been tested
  with a TC-1041.
  
> Configure the TCI unit to use a baud rate of 9600. There are two
  banks of switches located on the front of the unit labeled S1
  and S2. On bank S2 you want to set DIP switch 1 and 2 to both be
  ON for a 9600 baud rate.

> The ncidd server must be configured to use it.  The server normally
  assumes a modem is going to be used so it must be configured to use
  a serial device that does not use AT commands.

> Uncomment these lines in **ncidd.conf** (this assumes the device 
  is connected to serial port 0):

>>      # set ttyport = /dev/ttyS0    # Linux Serial Port 0
>>      # set ttyspeed = 9600         # TCI serial device port speed
>>      # set cidinput = 1

> TCI units supply their own line id to ncidd as a two-digit number.
  When a setting for *lineid* in **ncidd.conf** is not given,
  ncidd will automatically replace the default with this two-digit
  number.
  
> You may, if you wish, prefix the two-digit number with a 
  meaningful identifier, such as 'MLX-', by uncommenting this 
  line in **ncidd.conf**

>>      # set lineid = POTS

> and changing it to

>>      set lineid = MLX-

> Here are the specifications of the TCI serial device:

>> ttyport:

>>>      9600 8N1

>> Output Format is fixed field with total length of 70 bytes:

>>>      01      9/05     11:17 AM       702-555-1145           CARD SERVICES  
>>>      02      9/05      2:00 PM            PRIVATE                          

<br>

### <a name="devices_swc"></a>Whozz Calling serial devices

> Whozz Calling serial devices are used in place of one or more
  modems. They are currently supported by NCID only when the Output
  Format switch is set to TCI.
  
> Set DIP switch 5 to OFF for a baud rate of 9600.

> Set DIP switch 7 to ON for TCI output format.
  
> The ncidd server must be configured to use it.  The server normally
  assumes a modem is going to be used so it must be configured to use
  a serial device that does not use AT commands.

> Uncomment these lines in **ncidd.conf** (this assumes the device 
  is connected to serial port 0):

>>      # set ttyport = /dev/ttyS0    # Linux Serial Port 0
>>      # set ttyspeed = 9600         # TCI serial device port speed
>>      # set cidinput = 1

> The TCI output format supplies its own line id to ncidd as a 
  two-digit number. When a setting for *lineid* in **ncidd.conf** is
  not given, ncidd will automatically replace the default with
  this two-digit number.
  
> You may, if you wish, prefix the two-digit number with a 
  meaningful identifier, such as 'WC-', by uncommenting this 
  line in **ncidd.conf**

>>      # set lineid = POTS

> and changing it to

>>      set lineid = WC-

> Here are the specifications of the Whozz Calling serial device 
  in TCI mode:

>> ttyport:

>>>      9600 8N1

>> Output Format is fixed field with total length of 70 bytes:

>>>      01      9/05     11:17 AM       702-555-1145           CARD SERVICES  
>>>      02      9/05      2:00 PM            PRIVATE                          

<br>

### <a name="devices_wc"></a>Whozz Calling Ethernet Link

> A Whozz Calling (WC) Caller ID and Call monitoring unit is used in place
  of one or more modems.  There are various models that all monitor incoming
  calls and some can monitor outbound as well.

> See [CallerID.com](http://CallerID.com).

> Refer to the [wc2ncid setup](#gateways_wc) in the 
   [Gateways](#gateways_top) section to configure 
   NCID to work with the WC device.

<br>

### <a name="devices_obi"></a>Obihai VoIP Telephone Adapters and IP Phone

> [Obihai](http://www.obihai.com/) sells the OBi1032 IP phone
  and the popular OBi100, OBi110, OBi200, OBi202 VoIP telephone adapters.
  
> OBi devices equipped with a USB port also support the *OBiLINE
 FXO to USB Phone Line Adapter*. The OBiLINE provides PSTN (or 
 POTS) connectivity to phones attached to the OBi device as well
 as to calls bridged from VoIP services to a land-line service 
 via the OBi.
 
 > It appears that OBi devices require at least one third party VoIP service
 provider, even if you intend to use a POTS line as your primary
 incoming and outgoing service.

> The OBi110 comes with an FXO port built-in.

> Only the OBi100, OBi110, OBi200 with OBiLINE and OBi202 
  with OBiLINE, were available for
  development and testing. The other OBi products may work
  completely, partially, or not at all.

> Refer to the [obi2ncid setup](#gateways_obi) in the 
   [Gateways](#gateways_top) section to configure 
   NCID to work with the Obihai device.
