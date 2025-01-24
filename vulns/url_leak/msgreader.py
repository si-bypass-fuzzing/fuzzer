#!/usr/bin/env python3

import sys
import re

msg_starts = ["PAPZMsgStart",
"PAPZCTreeManagerMsgStart",
"PAPZInputBridgeMsgStart",
"PAltDataOutputStreamMsgStart",
"PAltServiceMsgStart",
"PAltSvcTransactionMsgStart",
"PBackgroundMsgStart",
"PBackgroundDataBridgeMsgStart",
"PBackgroundIDBCursorMsgStart",
"PBackgroundIDBDatabaseMsgStart",
"PBackgroundIDBDatabaseFileMsgStart",
"PBackgroundIDBFactoryMsgStart",
"PBackgroundIDBFactoryRequestMsgStart",
"PBackgroundIDBRequestMsgStart",
"PBackgroundIDBTransactionMsgStart",
"PBackgroundIDBVersionChangeTransactionMsgStart",
"PBackgroundIndexedDBUtilsMsgStart",
"PBackgroundLSDatabaseMsgStart",
"PBackgroundLSObserverMsgStart",
"PBackgroundLSRequestMsgStart",
"PBackgroundLSSimpleRequestMsgStart",
"PBackgroundLSSnapshotMsgStart",
"PBackgroundLocalStorageCacheMsgStart",
"PBackgroundSDBConnectionMsgStart",
"PBackgroundSDBRequestMsgStart",
"PBackgroundSessionStorageCacheMsgStart",
"PBackgroundSessionStorageManagerMsgStart",
"PBackgroundSessionStorageServiceMsgStart",
"PBackgroundStarterMsgStart",
"PBackgroundStorageMsgStart",
"PBackgroundTestMsgStart",
"PBenchmarkStorageMsgStart",
"PBroadcastChannelMsgStart",
"PBrowserMsgStart",
"PBrowserBridgeMsgStart",
"PCacheMsgStart",
"PCacheOpMsgStart",
"PCacheStorageMsgStart",
"PCacheStreamControlMsgStart",
"PCamerasMsgStart",
"PCanvasMsgStart",
"PCanvasManagerMsgStart",
"PChromiumCDMMsgStart",
"PClientHandleMsgStart",
"PClientHandleOpMsgStart",
"PClientManagerMsgStart",
"PClientManagerOpMsgStart",
"PClientNavigateOpMsgStart",
"PClientSourceMsgStart",
"PClientSourceOpMsgStart",
"PClipboardReadRequestMsgStart",
"PClipboardWriteRequestMsgStart",
"PColorPickerMsgStart",
"PCompositorBridgeMsgStart",
"PCompositorManagerMsgStart",
"PCompositorWidgetMsgStart",
"PContentMsgStart",
"PContentPermissionRequestMsgStart",
"PCookieServiceMsgStart",
"PCycleCollectWithLogsMsgStart",
"PDNSRequestMsgStart",
"PDataChannelMsgStart",
"PDocAccessibleMsgStart",
"PDocumentChannelMsgStart",
"PEndpointForReportMsgStart",
"PExtensionsMsgStart",
"PExternalHelperAppMsgStart",
"PFetchMsgStart",
"PFetchEventOpMsgStart",
"PFetchEventOpProxyMsgStart",
"PFileChannelMsgStart",
"PFileCreatorMsgStart",
"PFilePickerMsgStart",
"PFileSystemAccessHandleMsgStart",
"PFileSystemAccessHandleControlMsgStart",
"PFileSystemManagerMsgStart",
"PFileSystemRequestMsgStart",
"PFileSystemWritableFileStreamMsgStart",
"PGIOChannelMsgStart",
"PGMPMsgStart",
"PGMPContentMsgStart",
"PGMPServiceMsgStart",
"PGMPStorageMsgStart",
"PGMPTimerMsgStart",
"PGMPVideoDecoderMsgStart",
"PGMPVideoEncoderMsgStart",
"PGPUMsgStart",
"PGamepadEventChannelMsgStart",
"PGamepadTestChannelMsgStart",
"PHalMsgStart",
"PHandlerServiceMsgStart",
"PHeapSnapshotTempFileHelperMsgStart",
"PHttpBackgroundChannelMsgStart",
"PHttpChannelMsgStart",
"PHttpConnectionMgrMsgStart",
"PHttpTransactionMsgStart",
"PIPCClientCertsMsgStart",
"PIPDLUnitTestMsgStart",
"PIdleSchedulerMsgStart",
"PImageBridgeMsgStart",
"PInProcessMsgStart",
"PInputChannelThrottleQueueMsgStart",
"PJSOracleMsgStart",
"PJSValidatorMsgStart",
"PLockManagerMsgStart",
"PLockRequestMsgStart",
"PMIDIManagerMsgStart",
"PMIDIPortMsgStart",
"PMediaMsgStart",
"PMediaSystemResourceManagerMsgStart",
"PMediaTransportMsgStart",
"PMessagePortMsgStart",
"PNativeDNSResolverOverrideMsgStart",
"PNeckoMsgStart",
"PPaymentRequestMsgStart",
"PProcessHangMonitorMsgStart",
"PProfilerMsgStart",
"PProxyAutoConfigMsgStart",
"PProxyConfigLookupMsgStart",
"PQuotaMsgStart",
"PQuotaRequestMsgStart",
"PQuotaTestMsgStart",
"PQuotaUsageRequestMsgStart",
"PRDDMsgStart",
"PRemoteDecoderMsgStart",
"PRemoteDecoderManagerMsgStart",
"PRemoteLazyInputStreamMsgStart",
"PRemotePrintJobMsgStart",
"PRemoteQuotaObjectMsgStart",
"PRemoteSpellcheckEngineMsgStart",
"PRemoteWorkerMsgStart",
"PRemoteWorkerControllerMsgStart",
"PRemoteWorkerServiceMsgStart",
"PScriptCacheMsgStart",
"PSelectTLSClientAuthCertMsgStart",
"PServiceWorkerMsgStart",
"PServiceWorkerContainerMsgStart",
"PServiceWorkerManagerMsgStart",
"PServiceWorkerRegistrationMsgStart",
"PSessionStorageObserverMsgStart",
"PSessionStoreMsgStart",
"PSharedWorkerMsgStart",
"PSimpleChannelMsgStart",
"PSocketProcessMsgStart",
"PSocketProcessBackgroundMsgStart",
"PSocketProcessBridgeMsgStart",
"PSpeechSynthesisMsgStart",
"PSpeechSynthesisRequestMsgStart",
"PStreamFilterMsgStart",
"PStunAddrsRequestMsgStart",
"PTCPServerSocketMsgStart",
"PTCPSocketMsgStart",
"PTRRServiceMsgStart",
"PTemporaryIPCBlobMsgStart",
"PTestBasicMsgStart",
"PTestCrossProcessSemaphoreMsgStart",
"PTestInduceConnectionErrorMsgStart",
"PTestManyHandlesMsgStart",
"PTestShellMsgStart",
"PTestShellCommandMsgStart",
"PTextureMsgStart",
"PTransportProviderMsgStart",
"PUDPSocketMsgStart",
"PURLClassifierMsgStart",
"PURLClassifierLocalMsgStart",
"PUiCompositorControllerMsgStart",
"PUtilityAudioDecoderMsgStart",
"PUtilityProcessMsgStart",
"PVRMsgStart",
"PVRGPUMsgStart",
"PVRLayerMsgStart",
"PVRManagerMsgStart",
"PVerifySSLServerCertMsgStart",
"PVideoBridgeMsgStart",
"PVsyncMsgStart",
"PVsyncBridgeMsgStart",
"PWebAuthnTransactionMsgStart",
"PWebBrowserPersistDocumentMsgStart",
"PWebBrowserPersistResourcesMsgStart",
"PWebBrowserPersistSerializeMsgStart",
"PWebGLMsgStart",
"PWebGPUMsgStart",
"PWebRenderBridgeMsgStart",
"PWebSocketMsgStart",
"PWebSocketConnectionMsgStart",
"PWebSocketEventListenerMsgStart",
"PWebTransportMsgStart",
"PWebrtcGlobalMsgStart",
"PWebrtcTCPSocketMsgStart",
"PWindowGlobalMsgStart",
"LastMsgIndex"]

def string_to_bytes(input_string):
    # This function will convert the mixed string to bytes
    # It handles the escaped characters and converts them properly
    byte_array = bytearray()
    
    # Regex to match \xhh escapes and any other characters
    pattern = re.compile(r'\\x([0-9a-fA-F]{2})|([^\\]+)')
    
    pos = 0
    while pos < len(input_string):
        match = pattern.search(input_string, pos)
        if match:
            if match.group(1):  # Matched hex pattern \xhh
                # Convert hex string to byte and append
                byte_array.append(int(match.group(1), 16))
            else:  # Matched regular characters
                # Directly add the characters as bytes
                byte_array.extend(match.group(2).encode('utf-8'))
            pos = match.end()
        else:
            pos += 1

    return bytes(byte_array)

if __name__ == "__main__":
    # Check if an argument is provided
    if len(sys.argv) != 2:
        print("Usage: python script.py '<string>'")
        sys.exit(1)
    
    input_string = sys.argv[1]
    input_bytes = string_to_bytes(input_string)
    input_int = int.from_bytes(input_bytes, byteorder='little', signed=False)
    print(f"msg start: {msg_starts[input_int >> 16]}, msg id: {input_int & 0xffff}")




