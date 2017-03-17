package com.gank.ui;

import java.util.List;

import com.alibaba.fastjson.JSON;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.uimanager.events.RCTEventEmitter;
import com.gank.R;
import com.gank.model.Img;

import android.support.v4.widget.SwipeRefreshLayout;
import android.support.v7.widget.DefaultItemAnimator;
import android.support.v7.widget.GridLayoutManager;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.support.v7.widget.StaggeredGridLayoutManager;
import android.text.TextUtils;
import android.view.LayoutInflater;
import android.widget.Toast;

/**
 * Created by 否命题
 * create at: 2017/3/14.
 * email :FMT157@126.com
 */

public class ReactWaterfallView extends SimpleViewManager<RecyclerView> implements WaterfallAdapter.ClickInterface {
    private RecyclerView mMRecycleView;
    private List<Img> url;
    private WaterfallAdapter mWaterfallAdapter;
//    private SwipeRefreshLayout mMSwipeRefreshLayout;
    private  ThemedReactContext mreactContext;
    @Override
    public String getName() {
        return "ReactWaterfallView";
    }

    @Override
    protected RecyclerView createViewInstance(final ThemedReactContext reactContext) {
        mMRecycleView = (RecyclerView) LayoutInflater.from(reactContext).inflate(R.layout.item_react_water_fall, null);
        initRecyclerView(reactContext, mMRecycleView);
        this.mreactContext=reactContext;
        return mMRecycleView;
    }

    @Override
    public void click(String url) {
        WritableMap nativeEvent = Arguments.createMap();
        nativeEvent.putString("msg", url);
        mreactContext.getJSModule(RCTEventEmitter.class).receiveEvent(mMRecycleView.getId(), "topChange",
                nativeEvent);
    }

    private void initRecyclerView(final ThemedReactContext reactContext, final RecyclerView recyclerView) {
        //        recyclerView.setHasFixedSize(true); // 设置固定大小
        initRecyclerLayoutManager(recyclerView); // 初始化布局
        initRecyclerAdapter(reactContext, recyclerView); // 初始化适配器
        initItemDecoration(recyclerView); // 初始化装饰
        initItemAnimator(recyclerView); // 初始化动画效果

//        mMSwipeRefreshLayout.setColorSchemeResources(android.R.color.holo_blue_bright, android.R.color.holo_green_light,
//                android.R.color.holo_orange_light, android.R.color.holo_red_light);
//        mMSwipeRefreshLayout.setOnRefreshListener(new SwipeRefreshLayout.OnRefreshListener() {
//            @Override
//            public void onRefresh() {
//                WritableMap nativeEvent = Arguments.createMap();
//                nativeEvent.putString("msg", "onRefresh");
//                reactContext.getJSModule(RCTEventEmitter.class).receiveEvent(mMRecycleView.getId(), "topChange", nativeEvent);
//            }
//        });
        mMRecycleView.setOnScrollListener(new RecyclerView.OnScrollListener() {

            @Override
            public void onScrollStateChanged(RecyclerView recyclerView, int newState) {
                int lastPosition = -1;

                //当前状态为停止滑动状态SCROLL_STATE_IDLE时
                if (newState == RecyclerView.SCROLL_STATE_IDLE) {
                    RecyclerView.LayoutManager layoutManager = recyclerView.getLayoutManager();
                    if (layoutManager instanceof GridLayoutManager) {
                        //通过LayoutManager找到当前显示的最后的item的position
                        lastPosition = ((GridLayoutManager) layoutManager).findLastVisibleItemPosition();
                    } else if (layoutManager instanceof LinearLayoutManager) {
                        lastPosition = ((LinearLayoutManager) layoutManager).findLastVisibleItemPosition();
                    } else if (layoutManager instanceof StaggeredGridLayoutManager) {
                        //因为StaggeredGridLayoutManager的特殊性可能导致最后显示的item存在多个，所以这里取到的是一个数组
                        //得到这个数组后再取到数组中position值最大的那个就是最后显示的position值了
                        int[] lastPositions = new int[((StaggeredGridLayoutManager) layoutManager).getSpanCount()];
                        ((StaggeredGridLayoutManager) layoutManager).findLastVisibleItemPositions(lastPositions);
                        lastPosition = findMax(lastPositions);
                    }

                    //时判断界面显示的最后item的position是否等于itemCount总数-1也就是最后一个item的position
                    //如果相等则说明已经滑动到最后了
                    if (lastPosition == recyclerView.getLayoutManager().getItemCount() - 1) {
//                        if (!mMSwipeRefreshLayout.isRefreshing()) {
//                            mMSwipeRefreshLayout.setRefreshing(true);
                            WritableMap nativeEvent = Arguments.createMap();
                            nativeEvent.putString("msg", "onLoadMore");
                            reactContext.getJSModule(RCTEventEmitter.class).receiveEvent(mMRecycleView.getId(), "topChange",
                                    nativeEvent);
//                        }
                    }

                }
            }

            @Override
            public void onScrolled(RecyclerView recyclerView, int dx, int dy) {

            }
        });
    }
    //找到数组中的最大值
    private int findMax(int[] lastPositions) {
        int max = lastPositions[0];
        for (int value : lastPositions) {
            if (value > max) {
                max = value;
            }
        }
        return max;
    }
    private void initRecyclerLayoutManager(RecyclerView recyclerView) {
        // 错列网格布局
        recyclerView.setLayoutManager(new StaggeredGridLayoutManager(2,
                StaggeredGridLayoutManager.VERTICAL));
    }

    private void initRecyclerAdapter(ThemedReactContext context, RecyclerView recyclerView) {
        mWaterfallAdapter = new WaterfallAdapter(context, url,this);
        recyclerView.setAdapter(mWaterfallAdapter);
    }

    @ReactProp(name = "data")
    public void setData(RecyclerView view, String jsonUrl) {
        if (TextUtils.isEmpty(jsonUrl)) {
            return;
        }
//        mMSwipeRefreshLayout.setRefreshing(false);
        List<Img> url = JSON.parseArray(jsonUrl, Img.class);
        this.url = url;
        mWaterfallAdapter.setDatas(url);
    }

    private void initItemDecoration(RecyclerView recyclerView) {
        recyclerView.addItemDecoration(new WaterfallDecoration(16));
    }

    private void initItemAnimator(RecyclerView recyclerView) {
        recyclerView.setItemAnimator(new DefaultItemAnimator()); // 默认动画
    }

}
