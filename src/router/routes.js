const routes = [
    {
        name: 'root',
        path:'/',
        component: ()=> import('view/login')
    },
    {
        name: 'login',
        path: '/login',
        component: ()=> import('view/login')
    },
    {
        name: 'register',
        path: '/register',
        component: ()=> import('view/register')
    },
    {
        name: '404',
        path: '/NotFound',
        component: ()=>import('view/404')
    },
    {
        path: '/index',
        components:{
            default:  ()=> import('view')
        },
        children:[
            {
                name:'index',
                path:'',
                components: {
                    main: ()=> import('component/home/home')
                }
            },
            {
                name:'userManager',
                path: 'usermanager',
                components:{
                    main: () => import('component/userManager/userManager'),
                    default: () => import('view')
                }
            },
            {
                path: 'mine',
                components:{
                    main: () =>import('component/mine/index'),
                },
                children:[{
                    name: 'mine',
                    path: '',
                    components:{
                        mine: ()=> import('component/mine/home')
                    }
                },{
                    name:'edit',
                    path:'edit',
                    components:{
                        mine: ()=>import('component/mine/edit')
                    }
                }]
            },
            {
                path:'courseManager',
                name:'courseManager',
                components:{
                    main: ()=>import('component/courseManager')
                }
            },
            {
                name: "study",
                path:'study',
                components:{
                    main: ()=> import('component/study')
                }
            }
        ]
    }
]

export default routes