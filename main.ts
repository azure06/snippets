function findEnd(str: string, start: number, open = 1) {
  while (open !== 0) {
    switch (str[start]) {
      case "[":
        open += 1;
        start += 1;
        break;
      case "]":
        open -= 1;
        break;
      default:
        start += 1;
        break;
    }
  }
  return start;
}

function parse(input: string) {
  const isMap = input.startsWith("map") && input.endsWith("]");
  if (isMap) {
    const target = input.replace(/^map\[/, "").replace(/\]$/, "");
    const keyValues: Array<{ [key: string]: any }> = [];
    for (let start = 0, end = start + 1; end < target.length; ) {
      if (target[end] === ":") {
        if (target.substring(end + 1, end + 4) === "map") {
          const key = target.substring(start, end);
          const newStart = findEnd(target, end + 1 + 4) + 1;
          const value = target.slice(end + 1, newStart);
          start = newStart;
          end = start + 1;
          keyValues.push({ [key]: parse(value) });
        } else if (target[end + 1] === "[") {
          const key = target.substring(start, end);
          const newStart = findEnd(target, end + 1 + 1) + 1;
          const value = target.slice(end + 1, newStart);
          start = newStart;
          end = start + 1;
          keyValues.push({ [key]: parse(value) });
        } else {
          // scope:openid profile email r10_guest_login:false
          const key = target.substring(start, end);
          end += 1;
          const valueStart = end;
          let spacePos;
          while (end < target.length) {
            if (target[end] === " ") spacePos = end;
            if (target[end] === ":" && spacePos !== undefined) break;
            end += 1;
          }
          const value = target.slice(valueStart, spacePos);
          start = (spacePos ?? end) + 1;
          end = start + 1;
          keyValues.push({ [key]: value });
        }
      } else {
        end += 1;
      }
    }
    return keyValues.reduce((acc, val) => {
      return { ...acc, ...val };
    }, {});
  }
  const isArr = input.startsWith("[") && input.endsWith("]");
  if (isArr) {
    const str2 = input.replace(/^\[/, "").replace(/\]$/, "");
    return str2.split(",");
  }
  const isBoolean = input === "true" || input === "false";
  if (isBoolean) return Boolean(input);
  if (!isNaN(Number(input))) return +input;
  return input;
}

const res = parse(
  `map[iss:https://login.account.rakuten.com aud:[https://login.account.rakuten.com] iat:1676541494 exp:1676543294 omni_txn:map[wauthn_supp:true auth_req:map[redirect_uri:https://www.rakuten.com.tw/member/delegate response_type:code r10_audience:rid r10_disable_intra:true state:return_url=https%3A%2F%2Fwww.rakuten.com.tw%2F scope:openid profile email r10_guest_login:false type:com.rakuten.membership.omni.common.auth.model.OpenIdAuthorizeRequest client_id:rakuten_tw01 r10_country_code:TW ui_locales:zh-TW] auth_typ:PASSWORD types:[PASSWORD] eid:452364149 cr_id:0c4151da-9a25-46e7-8ef6-caa34d3f5f3e uid:gabri06e@gmail.com no_sso:false trs_dev:false] rakuten:map[purp:access]]`
);

console.log(res);
