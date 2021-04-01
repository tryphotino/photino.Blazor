import { DotNet } from '@microsoft/dotnet-js-interop';
import { Blazor } from './GlobalExports';
import { shouldAutoStart } from './BootCommon';
import { internalFunctions as navigationManagerFunctions } from './Services/NavigationManager';
import { setEventDispatcher } from './Rendering/Events/EventDispatcher';
import { startIpcReceiver } from './Platform/WebView/WebViewIpcReceiver';
import { sendBrowserEvent, sendAttachPage, sendBeginInvokeDotNetFromJS, sendEndInvokeJSFromDotNet, sendLocationChanged } from './Platform/WebView/WebViewIpcSender';
import { InputFile } from './InputFile';

let started = false;

async function boot(): Promise<void> {
  if (started) {
    throw new Error('Blazor has already started.');
  }
  started = true;

  startIpcReceiver();

  DotNet.attachDispatcher({
    beginInvokeDotNetFromJS: sendBeginInvokeDotNetFromJS,
    endInvokeJSFromDotNet: sendEndInvokeJSFromDotNet,
  });

  Blazor._internal.InputFile = InputFile;
  navigationManagerFunctions.enableNavigationInterception();
  navigationManagerFunctions.listenForNavigationEvents(sendLocationChanged);

  sendAttachPage(navigationManagerFunctions.getBaseURI(), navigationManagerFunctions.getLocationHref());
}

setEventDispatcher(sendBrowserEvent);

Blazor.start = boot;

if (shouldAutoStart()) {
  boot();
}
