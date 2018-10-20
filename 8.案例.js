    //全局设置请求根地址
    axios.defaults.baseURL="http://127.0.0.1"
    // 创建 Vue 实例，得到 ViewModel
    Vue.prototype.$http = axios;
    //创建全局过滤器
    Vue.filter("timeFormat", (oldTime)=>{
        const date = new Date(oldTime);
        const y = date.getFullYear();
        const m = (date.getMonth()+1).toString().padStart(2, '0');
        const d = (date.getDate()).toString().padStart(2, '0');

        const hh = (date.getHours()).toString().padStart(2, '0');
        const mm = (date.getMinutes()).toString().padStart(2, '0');
        const ss = (date.getSeconds()).toString().padStart(2, '0');
        return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
    })
    var vm = new Vue({
        el: '#app',
        data: {
            keyword:'',
            name:'',
            list:[],
        },
        methods: {
            async getInfo(){
                const {data:res} = await this.$http.get('/api/getprodlist');
                if (res.status !== 0) return;
                //console.log(res);
                this.list = res.message;
            },
            async addBrand() {
                const {data: res} = await this.$http.post('/api/addproduct',{name: this.name})
                console.log(res);
                this.getInfo()
            },
            async removeBrand(id){
                console.log(id);
                const res = await this.$http.get('/api/delproduct/'+id)
                console.log(res);
                if (res.data.status !== 0) return alert('删除失败')
                alert('第'+ id+'条数据删除成功');
                this.getInfo()
            },
            searchKey(){
                const key = this.keyword;
                return this.list.filter((item, i)=>{
                    return item.name.includes(key)
                })
            }
        },
        created(){
            this.getInfo();
        }
    });
