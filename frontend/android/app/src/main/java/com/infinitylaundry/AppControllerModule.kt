package com.infinitylaundry

import android.content.Intent
import android.content.pm.PackageManager
import android.os.Build
import androidx.annotation.RequiresApi
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod


class AppControllerModule(reactContext: ReactApplicationContext?) : ReactContextBaseJavaModule(reactContext) {
  override fun getName(): String {
    return  "AppControllerModule";
  }

  @RequiresApi(api = Build.VERSION_CODES.M)
  @ReactMethod
  fun restart(promise: Promise) {
    val packageManager: PackageManager = this.reactApplicationContext.packageManager
    val intent = packageManager.getLaunchIntentForPackage(this.reactApplicationContext.packageName)
    val componentName = intent!!.component
    val mainIntent = Intent.makeRestartActivityTask(componentName)
    mainIntent.setPackage(this.reactApplicationContext.packageName)
    this.reactApplicationContext.startActivity(mainIntent)
    Runtime.getRuntime().exit(0)
  }
}