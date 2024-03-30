package com.infinitylaundry

import android.content.Context
import android.content.SharedPreferences
import android.os.Build
import androidx.annotation.RequiresApi
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.PromiseImpl
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class SecureStorageModule(reactContext: ReactApplicationContext?) : ReactContextBaseJavaModule(reactContext) {
    override fun getName(): String {
        return "SecureStorageModule";
    }

    @RequiresApi(api = Build.VERSION_CODES.M)
    @ReactMethod
    fun setValue(key: String, value: String) {
        val preferenceName = this.currentActivity?.resources?.getString(R.string.secretKeys);
        val preferences : SharedPreferences? = this.currentActivity?.getSharedPreferences(preferenceName, Context.MODE_PRIVATE);
        preferences?.edit()?.putString(key, value)?.apply();
    }

    @RequiresApi(api = Build.VERSION_CODES.M)
    @ReactMethod
    fun getValue(key: String, promise: Promise) {
        val preferenceName = this.currentActivity?.resources?.getString(R.string.secretKeys);
        val preferences : SharedPreferences? = this.currentActivity?.getSharedPreferences(preferenceName, Context.MODE_PRIVATE);
        val value =  preferences?.getString(key, null);
        return promise.resolve(value);
    }

    @RequiresApi(api = Build.VERSION_CODES.M)
    @ReactMethod
    fun deleteValue(key: String, promise: Promise) {
        val preferenceName = this.currentActivity?.resources?.getString(R.string.secretKeys);
        val preferences : SharedPreferences? = this.currentActivity?.getSharedPreferences(preferenceName, Context.MODE_PRIVATE);
        preferences?.edit()?.remove(key)?.apply();
        return promise.resolve(true);
    }

}