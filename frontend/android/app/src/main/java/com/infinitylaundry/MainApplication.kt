package com.infinitylaundry

import android.app.Application
import com.facebook.react.PackageList
import com.facebook.react.ReactApplication
import com.facebook.react.ReactHost
import com.facebook.react.ReactNativeHost
import com.facebook.react.ReactPackage
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.load
import com.facebook.react.defaults.DefaultReactHost.getDefaultReactHost
import com.facebook.react.defaults.DefaultReactNativeHost
import com.facebook.react.flipper.ReactNativeFlipper
import com.facebook.soloader.SoLoader
import com.google.android.gms.common.moduleinstall.ModuleInstall
import com.google.android.gms.tflite.java.TfLite

class MainApplication : Application(), ReactApplication {

  override val reactNativeHost: ReactNativeHost =
      object : DefaultReactNativeHost(this) {
        override fun getPackages(): List<ReactPackage> =
            PackageList(this).packages.apply {
              // Packages that cannot be autolinked yet can be added manually here, for example:
              // add(MyReactNativePackage())
                add(SecureStoragePackage());
                add(QRCodeScannerPackage())
                add(AppControllerPackage())
            }

        override fun getJSMainModuleName(): String = "index"

        override fun getUseDeveloperSupport(): Boolean = BuildConfig.DEBUG

        override val isNewArchEnabled: Boolean = BuildConfig.IS_NEW_ARCHITECTURE_ENABLED
        override val isHermesEnabled: Boolean = BuildConfig.IS_HERMES_ENABLED
      }

  override val reactHost: ReactHost
    get() = getDefaultReactHost(this.applicationContext, reactNativeHost)

  override fun onCreate() {
    super.onCreate()
    val moduleInstallClient = ModuleInstall.getClient(this)

    val optionalModuleApi = TfLite.getClient(this)
    moduleInstallClient
            .areModulesAvailable(optionalModuleApi)
            .addOnSuccessListener {
              if (it.areModulesAvailable()) {
                moduleInstallClient.deferredInstall(optionalModuleApi)
                // Modules are present on the device...
              } else {
                // Modules are not present on the device...

              }
            }
            .addOnFailureListener {
              // Handle failure...
            }

//    val optionalModuleApi = TfLite.getClient(this)
    moduleInstallClient.deferredInstall(optionalModuleApi)


    SoLoader.init(this, false)
    if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {
      // If you opted-in for the New Architecture, we load the native entry point for this app.
      load()
    }
    ReactNativeFlipper.initializeFlipper(this, reactNativeHost.reactInstanceManager)
  }
}
