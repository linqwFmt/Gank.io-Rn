package com.gank.ui;

import java.util.ArrayList;
import java.util.List;

import com.alibaba.fastjson.JSON;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.uimanager.events.RCTEventEmitter;
import com.fasterxml.jackson.core.JsonParser;
import com.gank.MainApplication;
import com.gank.R;
import com.gank.model.Img;
import com.jcodecraeer.xrecyclerview.XRecyclerView;

import android.support.annotation.Nullable;
import android.support.v7.widget.DefaultItemAnimator;
import android.support.v7.widget.RecyclerView;
import android.support.v7.widget.StaggeredGridLayoutManager;
import android.text.TextUtils;
import android.view.LayoutInflater;
import android.view.ViewGroup;
import android.widget.RelativeLayout;
import android.widget.TextView;
import android.widget.Toast;

/**
 * Created by 林其望
 * create at: 2017/3/13.
 * email :linqw@xinguangnet.com
 */

public class ReactWaterfallView extends SimpleViewManager<RecyclerView> {
    private XRecyclerView mMRecycleView;
    private List<Img> url;
    private WaterfallAdapter mWaterfallAdapter;
    @Override
    public String getName() {
        return "ReactWaterfallView";
    }
    @Override
    protected RecyclerView createViewInstance(ThemedReactContext reactContext) {
        mMRecycleView= (XRecyclerView) LayoutInflater.from(reactContext).inflate(R.layout.item_react_water_fall,null);
        initRecyclerView( reactContext,mMRecycleView);
        return mMRecycleView;
    }
    private void initRecyclerView(final ThemedReactContext reactContext,final RecyclerView recyclerView) {
        //        recyclerView.setHasFixedSize(true); // 设置固定大小
        initRecyclerLayoutManager(recyclerView); // 初始化布局
        initRecyclerAdapter(recyclerView); // 初始化适配器
        initItemDecoration(recyclerView); // 初始化装饰
        initItemAnimator(recyclerView); // 初始化动画效果
        mMRecycleView.setLoadingListener(new XRecyclerView.LoadingListener() {
            @Override
            public void onRefresh() {
                WritableMap nativeEvent=  Arguments.createMap();
                nativeEvent.putString("onRefresh","onRefresh");
                reactContext.getJSModule(RCTEventEmitter.class).receiveEvent(mMRecycleView.getId(),"'onRefresh'",nativeEvent);
            }

            @Override
            public void onLoadMore() {
                WritableMap nativeEvent=  Arguments.createMap();
                nativeEvent.putString("onLoadMore","onLoadMore");
                reactContext.getJSModule(RCTEventEmitter.class).receiveEvent(mMRecycleView.getId(),"'onLoadMore'",nativeEvent);
            }
        });
    }
    private void initRecyclerLayoutManager(RecyclerView recyclerView) {
        // 错列网格布局
        recyclerView.setLayoutManager(new StaggeredGridLayoutManager(2,
                StaggeredGridLayoutManager.VERTICAL));
    }
    private void initRecyclerAdapter(RecyclerView recyclerView) {
        mWaterfallAdapter = new WaterfallAdapter(url);
        recyclerView.setAdapter(mWaterfallAdapter);
    }

    @ReactProp(name = "data")
    public void setData(RecyclerView view,String jsonUrl){
        if (TextUtils.isEmpty(jsonUrl))return;
        Toast.makeText(view.getContext(),jsonUrl,Toast.LENGTH_LONG).show();
        List<Img> url= JSON.parseArray(jsonUrl, Img.class);
        this.url=url;
        mWaterfallAdapter.setDatas(url);
    }

    private void initItemDecoration(RecyclerView recyclerView) {
        recyclerView.addItemDecoration(new WaterfallDecoration(16));
    }
    private void initItemAnimator(RecyclerView recyclerView) {
        recyclerView.setItemAnimator(new DefaultItemAnimator()); // 默认动画
    }

}
