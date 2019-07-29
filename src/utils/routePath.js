let thisTmpRouter = [
    {
    path: ["home", "index"],
    name: "homeIndex",
    meta:{
        keepAlive:false, //需要被缓存的组件
        stairNav:"workbench"
    }
    },
    {
        path: ["data", "index"],
        name: "dataIndex",
        meta:{
            keepAlive:false, //需要被缓存的组件
            stairNav:"data"
        }
    },
    {
    path: ["search", "index"],
    name: "searchIndex"
    },
    {
    path: ["due", "index"],
    name: "dueIndex",
    meta:{
        keepAlive:false, //需要被缓存的组件
        stairNav:"workbench"
    }
    },
    {
        path: ["collect", "index"],
        name: "collectIndex",
        meta:{
            keepAlive:false, //需要被缓存的组件
            stairNav:"workbench"
        }
    },
    {
        path: ["data", "userProtocol"],
        name: "datauserProtocol",
       
    },
    {
        path: ["process", "index"],
        name: "processIndex"
    },
    {
        path: ["animation", "index"],
        name: "animationIndex"
    },
    {
        path: ["lifeTree", "index"],
        name: "lifeTreeIndex"
    },
    {
        path: ["qixinbao", "index"],
        name: "qixinbaoIndex"
    },
    {
        path: ["qixinbao", "indexAtlas"],
        name: "qixinbaoIndexAtlas"
    },
    {
        path: ["jurisdiction", "index"],
        name: "jurisdictionIndex"
    },
    {
        path: ["account", "index"],
        name: "accountIndex"
    },
    {
        path: ["quota", "index"],
        name: "quotaIndex"
    },
   
]

let thisRouter = [];

for (let i in thisTmpRouter) {
    // let path = thisTmpRouter[i].path.join("/");
    // let parameter = thisTmpRouter[i].parameter ? thisTmpRouter[i].parameter : "";
    let component = [];

    for (var k in thisTmpRouter[i]['path']) {
        let obj = thisTmpRouter[i]['path'][k];
        if (k > 0) {
            obj = obj.replace(/(\w)/, function (v) {
                return v.toLowerCase()
            });
        }
        component.push(obj);
    }
    let data = {
        path: thisTmpRouter[i].name,
        meta:thisTmpRouter[i].meta,
        component: () => import('~/' + component.join("/") + '.vue'),
    }
    if (thisTmpRouter[i].name) {
        data['name'] = thisTmpRouter[i].name;
    }
    thisRouter.push(data);
}
console.log(thisRouter);



export default thisRouter