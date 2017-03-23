package com.gank;

import java.io.File;
import java.util.Arrays;
import java.util.List;

import javax.annotation.Nullable;

import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import android.app.Application;
import android.os.Environment;
import android.util.Log;
import android.widget.Toast;

public class MainApplication extends Application implements ReactApplication {
    public static final String TAG = "MainApplication";
    private String bundleParentPath = null;
    private String bundlePath = null;
    private String bundleName = "index.android.bundle";
    private File bundleFile = null;
    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
            return Arrays.<ReactPackage>asList(
                    new MainReactPackage(),
                    new GankViewManager()
            );
        }

        @Override
        protected String getJSMainModuleName() {
            return super.getJSMainModuleName();
        }

        @Nullable
        @Override
        protected String getBundleAssetName() {
            String bundleName = "index.android.bundle";

            if (bundleFile != null && bundleFile.exists()) {
                Log.d(TAG, "assets bundle exit");
                return null;
            }
            return bundleName;
        }

        @Nullable
        @Override
        protected String getJSBundleFile() {
            if (bundleFile != null && bundleFile.exists()) {
                Log.d(TAG, "js bundle file " + bundleFile.getPath());
                return bundleFile.getPath();
            }
            return null;
        }
    };

    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        SoLoader.init(this, /* native exopackage */ false);
        File file = new File(Environment.getExternalStorageDirectory().getAbsoluteFile() + "/test.zip");
        if (file.exists()) {
            try {
                ZipUtils.unzip(Environment.getExternalStorageDirectory().getAbsoluteFile() + "/test.zip", Environment.getExternalStorageDirectory().getAbsoluteFile()  + "/bundle");
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        bundleParentPath = Environment.getExternalStorageDirectory().getAbsoluteFile() + "/bundle";
        bundlePath = bundleParentPath + File.separator + bundleName;
        bundleFile = new File(bundlePath);
    }

}
