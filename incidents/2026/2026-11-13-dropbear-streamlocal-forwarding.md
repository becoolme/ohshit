---
title: Dropbear per-key forwarding limits leave Unix sockets reachable
level: 3
date: 2026-11-13
tags: [Dropbear, SSH, access control, embedded]
summary: A user with a restricted SSH key can bypass Dropbear's per-destination TCP forwarding limits by requesting Unix-domain socket forwarding. A lab test reached the Docker API when the SSH account already had access to its socket.
splash: Dropbear servers with Unix-socket forwarding enabled that rely on permitopen or permitlisten to restrict authenticated keys.
wipe: Disable forwarding on affected keys with no-port-forwarding, or disable Unix-socket forwarding in the server build.
inTheWild: 'no'
inTheWildNote: A researcher reproduced the issue in a lab. No exploitation outside the lab was reported.
timeline:
  - date: Nov 13, 19:38 UTC
    title: Researcher discloses the forwarding bypass
    body: The report documents the local socket test against Dropbear revision 99baf182 and traces the two Unix forwarding handlers.
checklist:
  - title: Identify keys that rely on destination restrictions
    hint: Run dropbear -V and check the installed firmware or package for downstream changes. Inspect the authorized_keys files for service and administrative accounts for permitopen and permitlisten. Confirm whether the running build enables local or remote Unix-socket forwarding.
  - title: Close Unix-socket forwarding paths
    hint: Add no-port-forwarding to affected keys where tunnels can be disabled. That also disables TCP forwarding on those keys. Where TCP tunnels must stay available, rebuild with DROPBEAR_SVR_LOCALSTREAMFWD and DROPBEAR_SVR_REMOTESTREAMFWD set to 0 in localoptions.h. If a rebuild is unavailable and all forwarding can stop, add -j and -k to the server startup options and reload or restart the service using your device’s documented procedure. Keep a recovery session available when changing SSH access.
  - title: Review privileged sockets and retest
    hint: Check group membership and socket permissions for the SSH account, including /var/run/docker.sock and local database or agent sockets. Remove unnecessary access. End affected sessions and verify from a new restricted session that Unix forwarding is rejected and that any required TCP tunnels still obey the intended policy.
sources:
  - name: Researcher's disclosure on oss-security
    url: https://www.openwall.com/lists/oss-security/2026/11/13/4
    primary: true
    says: Gives the tested revision, reproduction and Docker socket prerequisite.
  - name: Dropbear 2026.94 Unix forwarding code
    url: https://github.com/mkj/dropbear/blob/DROPBEAR_2026.94/src/svr-streamfwd.c
    primary: true
    says: Both handlers apply broad forwarding and forced-command checks without consulting per-destination TCP restrictions.
  - name: Dropbear 2026.94 key option implementation
    url: https://github.com/mkj/dropbear/blob/DROPBEAR_2026.94/src/svr-authpubkeyoptions.c
    primary: true
    says: Shows the per-key forwarding switch and separate TCP destination checks.
  - name: Dropbear 2026.94 build defaults
    url: https://raw.githubusercontent.com/mkj/dropbear/DROPBEAR_2026.94/src/default_options.h
    primary: true
    says: Shows both stream-forwarding build switches and where to override them.
  - name: Dropbear 2026.94 startup options
    url: https://raw.githubusercontent.com/mkj/dropbear/DROPBEAR_2026.94/src/svr-runopts.c
    primary: true
    says: Defines flags for disabling local and remote port and stream forwarding.
  - name: Dropbear releases
    url: https://github.com/mkj/dropbear/releases
    primary: true
    says: Lists upstream releases. No fixed release was identified as of November 15.
---

The TCP handlers check the destinations allowed by `permitopen` and `permitlisten`. The Unix-domain socket handlers in 2026.94 check the broader forwarding controls and forced-command settings without applying those destination lists. An attacker needs a valid SSH key, an account allowed to use Unix-socket forwarding, and access to a socket or an eligible path on the server. The local path can connect to a socket the session can reach. The remote path can request a listener at a path where the server permits it.

The researcher used a restricted key to reach a lab socket and then the Docker API on an account in the Docker group. Access to that daemon can give control of the host. The report tested a November 11 development revision. Both affected handlers are also present in the released 2026.94 source. Check your vendor’s build before drawing conclusions about other release versions or devices.
