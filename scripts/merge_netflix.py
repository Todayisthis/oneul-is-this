#!/usr/bin/env python3
import re
import os

def get_lines(content):
    # { id: XXXX, ... }, 형태의 라인만 추출
    return [l.strip().rstrip(',') for l in content.split('\n')
            if l.strip().startswith('{ id:') and 'title:' in l]

def get_url(line):
    m = re.search(r'url:\s*"(https://[^"]+)"', line)
    return m.group(1) if m else None

with open('scripts/netflix_old.ts', 'r', encoding='utf-8-sig') as f:
    old_content = f.read()

with open('data/contents/netflix.ts', 'r', encoding='utf-8') as f:
    new_content = f.read()

old_lines = get_lines(old_content)
new_lines = get_lines(new_content)

print(f"old: {len(old_lines)}, new: {len(new_lines)}")

new_urls = set(filter(None, [get_url(l) for l in new_lines]))

old_only = [l for l in old_lines if get_url(l) not in new_urls]
print(f"old only: {len(old_only)}, total will be: {len(new_lines) + len(old_only)}")

all_lines = new_lines + old_only

out = ['import type { Content } from "../contents";\n\n', 'export const netflixContents: Content[] = [\n']
for i, line in enumerate(all_lines):
    item = re.sub(r'id:\s*\d+', f'id: {9001 + i}', line)
    out.append(f'  {item},\n')
out.append('];\n')

with open(os.path.join('data', 'contents', 'netflix.ts'), 'w', encoding='utf-8') as f:
    f.writelines(out)

print(f"saved {len(all_lines)} items")
