/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import <UIKit/UIKit.h>

#import <React/RCTEventEmitter.h>

@interface RCTLinkingManager : RCTEventEmitter

+ (BOOL)application:(UIApplication *_Nonnull)app
            openURL:(NSURL *_Nonnull)URL
            options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *_Nonnull)options;

+ (BOOL)application:(UIApplication *_Nonnull)application
            openURL:(NSURL *_Nonnull)URL
  sourceApplication:(NSString *_Nonnull)sourceApplication
         annotation:(id _Nonnull )annotation;

+ (BOOL)application:(UIApplication *_Nonnull)application
continueUserActivity:(NSUserActivity *_Nonnull)userActivity
 restorationHandler:(void (^_Nonnull)(NSArray * __nullable))restorationHandler;

@end