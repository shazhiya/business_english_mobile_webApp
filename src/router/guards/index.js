import loginCheck from './login.check'
import notFound from './notFound'
import reload from './reload'
import autoLogin from "@/router/guards/autoLogin";

const beforeEach = (to, from, next) => {
    let auto = autoLogin(to, from, next)
    if (auto) {
        auto.then(res => {
            if (res) return
            normalStep(to, from, next)
        }).catch(() => {
            normalStep(to, from, next)
        })
        return
    }
    normalStep(to, from, next)
}

function normalStep(to, from, next) {
    if (loginCheck(to, from, next)) return
    if (notFound(to, from, next)) return
    if(reload(to, from)) return
    next()
}

export {
    beforeEach
}
