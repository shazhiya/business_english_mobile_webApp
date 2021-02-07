const routes = [
    {
        path: '/auth',
        components: {
            root: () => import("view/auth/index")
        },
        children: [
            {
                name: "login",
                path: "login",
                components: {
                    auth: () => import("view/auth/login")
                }
            },
            {
                name: 'register',
                path: 'register',
                components: {
                    auth: () => import('view/auth/register')
                }
            }
        ]
    },
    {
        path: '/exception',
        components: {
            root: () => import('view/exception/index')
        },
        children: [
            {
                name: "404",
                path: "notFound",
                components: {
                    exception: () => import("view/exception/404")
                }
            }
        ]
    },
    {
        name: "test",
        path: "/test",
        components: {
            root: () => import("component/detail/iconText")
        }

    },
    {
        path: '/index',
        components: {
            root: () => import('view/index/index'),
            main: () => import('view/index/subPages/home')
        },
        children: [
            {
                name: 'index',
                path: '',
                redirect: 'home'
            },
            {
                name: 'home',
                path: 'home',
                components: {
                    topBar: () => import('view/index/subPages/homeTopBar'),
                    main: () => import('view/index/subPages/home')
                }
            },
            {
                path: 'mine',
                components: {
                    main: () => import('view/index/subPages/mine'),
                },
                children: [{
                    name: 'mine',
                    path: '',
                    components: {
                        mine: () => import('component/mine/home')
                    }
                }, {
                    name: 'edit',
                    path: 'edit',
                    components: {
                        mine: () => import('component/mine/edit')
                    }
                }]
            },
            {
                name: 'message',
                path: 'message',
                components: {
                    main: () => import('view/index/subPages/message')
                }
            },
            {
                name: 'userManager',
                path: 'usermanager',
                components: {
                    main: () => import('component/userManager/userManager'),
                }
            },
            {
                path: 'courseManager',
                name: 'courseManager',
                components: {
                    main: () => import('component/courseManager')
                }
            },
            {
                name: "study",
                path: 'study',
                components: {
                    main: () => import('component/study')
                }
            }
        ]
    }
]

export default routes