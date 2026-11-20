---
title: Solidity fixes silent storage corruption when copying a nested recursive struct onto its ancestor
headline: The copy overwrites its own source
level: 3
date: '2026-11-19'
tags:
- Solidity
- compiler
- storage
ecosystems:
- solidity
summary: Solidity 0.8.39 fixes recursive storage copies that erase source data while copying it onto an enclosing struct or array. Both compiler pipelines are affected, regardless of optimizer or EVM settings. Solidity found no affected deployed copy in its Sourcify scan.
splash: evmasm 0.4.9–0.8.38 or IR 0.8.13–0.8.38; recursive storage copy whose target contains its source
wipe: Upgrade to Solidity 0.8.39, recompile and safely upgrade affected contracts; review existing storage and retest gas/depth limits
inTheWild: unknown
inTheWildNote: Solidity found no affected deployed copy in Sourcify; exploitation is not established.
fixed:
- product: Solidity
  branch: '0.8'
  version: 0.8.39
  status: Both pipelines fixed; compiler update alone does not replace deployed bytecode
timeline:
- date: Apr 22, 2026
  title: cyberthirst privately reports the compiler bug
  body: The initial PoC covers struct copies; Solidity also identifies the array-copy case.
- date: Nov 19, 2026
  title: Solidity discloses the issue and releases 0.8.39
  body: The team rates it medium and reports no affected deployed copy in its Sourcify scan.
checklist:
- title: Identify recursive storage copies with overlapping ancestry
  hint: Review direct and mutually recursive structs using dynamic arrays, including storage pointers, mappings and indexes that hide aliasing. Affected examples include root = root.children[i] and roots = roots[i].children; the target must contain the source.
- title: Recompile and update affected deployed code safely
  hint: Use 0.8.39 or later and your existing audited upgrade or migration process. Updating solc alone leaves old deployed bytecode intact. For source builds use the official solidity_0.8.39.tar.gz or v0.8.39 git tag, not GitHub auto-generated source archives.
- title: Inspect storage already touched by affected copies
  hint: Review values and nested arrays after historical affected assignments, including balances and permission flags that could have become zero. A compiler fix does not restore overwritten state; determine repairs from verified application history.
- title: Retest gas and recursion depth
  hint: The added overlap check walks the target and costs gas even for non-overlapping copies. It also consumes stack space; one optimized via-IR example fell from 252 to 126 levels. These are example limits, not universal thresholds.
- title: Avoid the opposite overlapping copy as well
  hint: root.children[i] = root remains unsupported with undefined behavior and may revert. The fix does not define or check that source-contains-target direction.
sources:
- name: Solidity security write-up, November 19
  url: https://www.soliditylang.org/blog/2026/11/19/overlapping-recursive-storage-struct-copy-corruption-bug/
  says: Affected versions and patterns, medium severity, private report date, scan limits and repair guidance
  primary: true
- name: Solidity 0.8.39 release announcement
  url: https://www.soliditylang.org/blog/2026/11/19/solidity-0.8.39-release-announcement/
  says: Release availability, additional runtime gas/stack cost and source-build instructions
  primary: true
---

A recursive storage structure copied from a descendant onto an enclosing ancestor can overwrite the source before finishing the read. The result silently loses nested values and can zero later fields. The target must contain the source through a recursive dynamic array, and the corrupted result must become observable. Direct and mutual recursion are covered; a non-recursive struct is outside scope. Storage aliasing can hide the overlap. This does not depend on optimizer settings or the EVM version.

The evmasm pipeline is affected from 0.4.9 through 0.8.38; the supported IR pipeline from 0.8.13 through 0.8.38. Earlier experimental IR builds also contained the bug. Version 0.8.39 snapshots the source when needed. It adds a check to all recursive storage-to-storage copies, increasing gas use and potentially reducing attainable nesting depth.

Solidity rates the flaw medium: consequences could include corrupted balances or permission checks, but the pattern is unusual. Its Sourcify scan found no deployed contract performing an affected copy. That is a bounded scan result, not proof every deployed contract is safe or evidence of theft. L3 reflects a mainstream compiler and public reproducer. No loss or in-the-wild exploitation is established. The release’s separate nested-tuple miscompilation is not classified as a security issue by Solidity.
