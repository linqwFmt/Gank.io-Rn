package com.gank.ui;

import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.views.image.ReactImageView;
import com.gank.R;

import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.widget.RelativeLayout;

/**
 * Created by 林其望
 * create at: 2017/3/13.
 * email :linqw@xinguangnet.com
 */

public class ReactWaterfallView extends SimpleViewManager<RelativeLayout> {
    @Override
    public String getName() {
        return "ReactWaterfallView";
    }

    @Override
    protected RelativeLayout createViewInstance(ThemedReactContext reactContext) {
        RelativeLayout mRelativeLayout= (RelativeLayout) LayoutInflater.from(reactContext).inflate(R.layout.item_react_water_fall,null);
        RecyclerView mRecycleView= (RecyclerView) mRelativeLayout.findViewById(R.id.mRecycleView);
        return mRelativeLayout;
    }
}
