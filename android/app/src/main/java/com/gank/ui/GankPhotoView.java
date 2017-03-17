package com.gank.ui;

import com.bumptech.glide.Glide;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;

import android.text.TextUtils;
import android.view.ViewGroup;
import android.widget.FrameLayout;
import android.widget.ImageView;
import android.widget.RelativeLayout;
import android.widget.Toast;
import uk.co.senab.photoview.PhotoViewAttacher;

/**
 * Created by 林其望
 * create at: 2017/3/16.
 * email :linqw@xinguangnet.com
 */

public class GankPhotoView extends SimpleViewManager<ImageView> {
    private PhotoViewAttacher mAttacher;
    private ImageView mImageView;

    @Override
    public String getName() {
        return "GankPhotoView";
    }

    @Override
    protected ImageView createViewInstance(ThemedReactContext reactContext) {
        mImageView = new ImageView(reactContext);
        RelativeLayout.LayoutParams layoutParams = new RelativeLayout.LayoutParams(RelativeLayout.LayoutParams.MATCH_PARENT,
                RelativeLayout.LayoutParams.MATCH_PARENT);
        layoutParams.addRule(RelativeLayout.CENTER_IN_PARENT);
        mImageView.setLayoutParams(layoutParams);
        mAttacher=new PhotoViewAttacher(mImageView);
        return mImageView;
    }
    @ReactProp(name = "data")
    public void setData(ImageView view, String url) {
        if (TextUtils.isEmpty(url)) {
            return;
        }
        Glide.with(view.getContext()).load(url).into(mImageView);
    }
}
