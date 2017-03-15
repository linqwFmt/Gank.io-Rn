package com.gank.ui;

import java.util.ArrayList;
import java.util.List;

import com.bumptech.glide.Glide;
import com.gank.R;
import com.gank.model.Img;

import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;

/**
 * Created by 林其望
 * create at: 2017/3/14.
 * email :linqw@xinguangnet.com
 */

public class WaterfallAdapter extends RecyclerView.Adapter<WaterfallAdapter.WaterfallViewHolder> {

    private List<Img> mDataModels;
    private List<Integer> heightList;

    WaterfallAdapter(List<Img> dataModels) {
        mDataModels = dataModels;
        initHeights();
    }

    private void initHeights() {
        if (mDataModels != null) {
            heightList = new ArrayList<>();
            for (int i = 0; i < mDataModels.size(); i++) {
                int height = (int) (Math.random() * 400 + 400);
                heightList.add(height);
            }
        }
    }

    @Override
    public WaterfallViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View itemView = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.item_recycler_view, parent, false);
        return new WaterfallViewHolder(itemView);
    }

    @Override
    public void onBindViewHolder(WaterfallViewHolder holder, int position) {
        String url = mDataModels.get(position).url;
//        //改变holder.button的高度
        int height = heightList.get(position);
        ViewGroup.LayoutParams lp = holder.mIv.getLayoutParams();
        lp.height = height;
        holder.mIv.setLayoutParams(lp);
        holder.load(url);
    }

    @Override
    public int getItemCount() {
        return mDataModels == null ? 0 : mDataModels.size();
    }


    public void setDatas(List<Img> datas) {
        mDataModels = datas;
        initHeights();

        notifyDataSetChanged();
    }

    class WaterfallViewHolder extends RecyclerView.ViewHolder {

        private final ImageView mIv;

        public WaterfallViewHolder(View itemView) {
            super(itemView);
            mIv = (ImageView) itemView.findViewById(R.id.iv);
        }

        public void load(String url) {
            Glide.with(mIv.getContext()).load(url).into(mIv);
        }
    }
}
