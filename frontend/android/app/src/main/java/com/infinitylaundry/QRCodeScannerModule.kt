package com.infinitylaundry

import android.os.Build
import androidx.annotation.RequiresApi
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.google.mlkit.vision.barcode.common.Barcode
import com.google.mlkit.vision.codescanner.GmsBarcodeScannerOptions
import com.google.mlkit.vision.codescanner.GmsBarcodeScanning

class QRCodeScannerModule(reactContext: ReactApplicationContext?) : ReactContextBaseJavaModule(reactContext) {
  override fun getName(): String {
    return  "QRCodeScannerModule";
  }

  @RequiresApi(api = Build.VERSION_CODES.M)
  @ReactMethod
  fun scan(promise: Promise) {
    val options = GmsBarcodeScannerOptions.Builder()
            .setBarcodeFormats(Barcode.FORMAT_QR_CODE, Barcode.FORMAT_AZTEC)
            .enableAutoZoom()
            .build()

    val scanner = GmsBarcodeScanning.getClient(this.reactApplicationContext)

    scanner.startScan()
            .addOnSuccessListener { barcode ->
              // Task completed successfully
             promise.resolve(barcode.rawValue)
            }
            .addOnCanceledListener {
              // Task canceled
              promise.resolve("operation canceled.")
            }
            .addOnFailureListener { e ->
              // Task failed with an exception
              promise.resolve("failed to scan code.")
            }
  }
}