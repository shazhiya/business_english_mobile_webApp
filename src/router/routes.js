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
            },
            {
                name: 'resetPassword',
                path: 'resetPassword',
                components: {
                    auth: () => import('view/auth/resetPassword')
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
            root: () => import("component/player/video.player")
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
                name: 'study',
                path: 'study',
                components: {
                    main: () => import('view/index/subPages/study')
                }
            }
        ]
    },
    {
        path: '/chatPanel',
        name: 'chatPanel',
        components: {
            root: () => import('component/message/chatPanel')
        }
    },
    {
        path: '/contacts/:type',
        name: 'contacts',
        components: {
            root: () => import('component/message/contacts')
        }
    },
    {
        name: 'userSpace',
        path: '/userSpace/:userName',
        components: {
            root: ()=> import('component/user/userSpace')
        }
    },
    {
        name: 'editProfile',
        path: '/mine/editProfile',
        components: {
            root: ()=> import('component/user/editProfile')
        }
    },
    {
        path: '/admin',
        components: {
            root: () => import('view/admin')
        },
        children: [
            {
                name: 'userManager',
                path: 'userManager',
                components: {
                    main: () => import('component/userManager/userManager'),
                }
            },
            {
                path: 'courseManager',
                name: 'courseManager-admin',
                components: {
                    main: () => import('component/courseManager')
                }
            },
            {
                name: "study-pc",
                path: 'study',
                components: {
                    main: () => import('component/study/index.pc')
                }
            }
        ]
    },
    {
        path: '/courseManager',
        components: {
            root: () =>import('view/courseManager')
        },
        children: [
            {
                name: 'courseManager',
                path: 'index'
            },{
                name: 'publishCourse',
                path: 'publishCourse',
                components:{
                    main: () => import('view/courseManager/subpage/publishCourse')
                }
            },
            {
                name: 'courseDetail',
                path: 'courseDetail',
                components:{
                    main: ()=> import('view/courseManager/subpage/courseDetail')
                }
            }
        ]
    },
    {
        path: '/communication',
        components: {
            root: ()=> import('view/communication')
        },
        children:[
            {
                name: 'allComment',
                path: 'allComment',
                components:{
                    main:()=>import('component/communication/allComment')
                }
            },
            {
                name: 'commentDetail',
                path: 'commentDetail',
                components: {
                    main:()=> import('component/communication/commentDetail')
                }
            }
        ]
    },
    {
        path: '/organization',
        components: {
            root: () => import("view/organization"),
        },
        children: [
            {
                name: 'clazzDetail',
                path: 'clazzDetail',
                components: {
                    main: ()=>import("component/clazz/clazzDetail")
                }
            },
            {
                name: 'createClazz',
                path: 'createClazz',
                components: {
                    main: () => import('component/clazz/createClazz')
                }
            },
            {
                name: 'applyOrganization',
                path: 'applyOrganization',
                components: {
                    main: ()=>import('view/organization/applyOrganization')
                }
            },
            {
                name: 'organizationManager',
                path: 'organizationManager',
                components: {
                    main: () => import('view/organization/organizationManager')
                }
            },
            {
                name: 'organizationDetail',
                path: 'organizationDetail',
                components: {
                    main: () => import('component/organization/detail')
                }
            }
        ]
    },
    {
        path: '/study',
        components: {
            root: ()=>import('view/study')
        },
        children: [
            {
                name: 'learning',
                path: 'learning',
                components:{
                    main: ()=>import('component/study/learning')
                }
            },
            {
                name: 'notePads',
                path: 'notePads',
                components:{
                    main: ()=>import('component/study/notePads')
                }
            },
            {
                name: 'noteItems',
                path: 'noteItems',
                components: {
                    main :()=>import('component/study/noteItems')
                }
            }
        ]
    },{
        path: '/task',
        components: {
            root: ()=> import('view/task')
        },
        children:[
            {
                name: 'assignTask',
                path: 'assignTask',
                components:{
                    main:()=>import('component/task/assignTask')
                }
            }
        ]
    }
]

export default routes