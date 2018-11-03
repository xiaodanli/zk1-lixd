var scroll = new BScroll('.con',{
    probeType:2
});

var innerCon = document.querySelector('.inner-con');

scroll.on('scroll',function(){
    console.log(this.y);
    if(this.y < this.maxScrollY - 44){
        innerCon.setAttribute('up','释放加载更多');
    }else if(this.y <this.maxScrollY - 22){
        innerCon.setAttribute('up','上拉加载');
    }else if(this.y > 44){
        innerCon.setAttribute('down','释放刷新');
    }
})

scroll.on('touchEnd',function(){
    if(innerCon.getAttribute('up') === '释放加载更多'){
        console.log("loadmore")
    }else if(innerCon.getAttribute('down') === '释放刷新'){
        console.log("释放刷新");
        window.location.reload();
    }
})