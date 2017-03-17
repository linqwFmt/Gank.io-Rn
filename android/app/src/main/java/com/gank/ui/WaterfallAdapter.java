package com.gank.ui;

import java.util.HashMap;
import java.util.List;

import com.bumptech.glide.Glide;
import com.bumptech.glide.load.engine.DiskCacheStrategy;
import com.gank.R;
import com.gank.model.Img;

import android.content.Context;
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
    private HashMap<String,Integer> maps;
   private  ClickInterface mClickInterface;
    private int defalutWidth,defaultHight;

    WaterfallAdapter(Context context,List<Img> dataModels,ClickInterface mClickInterface) {
        mDataModels = dataModels;
        if (maps==null){
            maps=new HashMap<>();
        }
        this.mClickInterface=mClickInterface;
    }


    @Override
    public WaterfallViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View itemView = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.item_recycler_view, parent, false);
        return new WaterfallViewHolder(itemView);
    }

    @Override
    public void onBindViewHolder(WaterfallViewHolder holder, int position) {
        final String url = mDataModels.get(position).url;
//        //改变holder.button的高度
        Integer height = maps.get(url);
        if (height==null||height.equals(0)){
            height = (int) (Math.random() * 400 + 400);
            maps.put(url,height);
        }
        ViewGroup.LayoutParams lp = holder.mIv.getLayoutParams();
        lp.height = height;
        holder.mIv.setLayoutParams(lp);
        holder.load(url);
        holder.mIv.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                mClickInterface.click(url);
            }
        });
    }


    @Override
    public int getItemCount() {
        return mDataModels == null ? 0 : mDataModels.size();
    }


    public void setDatas(List<Img> datas) {
        mDataModels = datas;


        notifyDataSetChanged();
    }

    class WaterfallViewHolder extends RecyclerView.ViewHolder {

        private final ImageView mIv;

        public WaterfallViewHolder(View itemView) {
            super(itemView);
            mIv = (ImageView) itemView.findViewById(R.id.iv);
        }

        public void load(String url) {
            Glide.with(mIv.getContext()).load(url).diskCacheStrategy(DiskCacheStrategy.ALL).crossFade().into(mIv);
        }
    }

    interface ClickInterface{
        void click(String url);
    }
}
