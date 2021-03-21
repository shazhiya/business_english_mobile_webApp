import back from "@/network";

import {Resolver} from 'fastjson_ref_resolver'
import qs from "qs";

export default function resolvedPost(url, data, successCallback, stringify) {
    if (stringify) data = qs.stringify(data)
    return back
        .post(url, data)
        .then(res => {
            return new Resolver(res.data).resolve()
        }).then(res => {
            if (successCallback) return successCallback(res)
            else return res
        })
}