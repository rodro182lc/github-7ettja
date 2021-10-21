// ARCH HINT: This retricts our code to inject a module more than once when it's not supposed to, for example our Core Module
export class EnsureModuleLoadedOnceGuard {
  constructor(targetModule: any) {
    if (targetModule) {
      throw new Error(
        `UI Architecture restriction: ${targetModule.constructor.name} has already been loaded, this module must be imported only in AppModule`
      );
    }
  }
}
