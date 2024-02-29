# BitPwn

An inefficient (but maybe slightly more robust) way to get internal Bitburner functions.

```
await createGlobals();
const GetAllServers = getInternalFunction(
  'Hostname of the server thats being added: ',
  '/src/Server/AllServers.ts',
  'GetAllServers',
);
console.log(GetAllServers()[0]);
```

The idea that inspired this is that you could deploy CTF-style hacking problems to the servers in the world.
If you pwn them, it cheats money into your account and makes hacking that server slightly more
profitable.

For whatever reason, I decided I wanted this to be installable as a script, not a mod/fork of Bitburner.
That requires writing some code to get arbitrary Bitburner functions.

## How to use

See [viteburner](https://github.com/Tanimodori/viteburner/blob/main/README.md) and [my modified viteburner template](https://github.com/KaiaSage/viteburner-template)

## WHAT'S DIFFERENT WITH THIS VERISON??

`exploit.js:createGlobals()` creates the following:
* consumer is a [sourceMap](https://www.npmjs.com/package/source-map) consumer, query it for information on what symbols in the sourcemap correspond to what in the minified bundled code.
* mR is a [moduleRaid](https://moduleraid.netlify.app/classes/moduleraid.moduleraid) instance, use it to select require() modules with the properties you want.
* bundleSrc is the source of bitburner.

`exploit.js:getInternalFunction` takes 3 arguments:
* A string unique to the module you care about. Usually there's an error-logging string you can use.
* A path to the source file, eg '/src/NetscriptWorker.ts'
* The unminified name of the function you want to find.

`exploit.js:getInternalClass` takes 2 arguments:
* A string unique to the module you care about. Usually there's an error-logging string you can use.
* A method of the class you care about.

Both of these are held together by duct tape and wire. They print a lot of useful information--if 
you can't find why your function isn't being found, open console to narrow it down.

## License

[MIT License](LICENSE) © 2024-present Kaia Sage

Distributed within this repository:
* ModuleRaid MIT License © 2018 Andreas N.
* Source-map BSD-3 Clause © 2009-2011, Mozilla Foundation and contributors
* Viteburner Template MIT License © 2022-present Tanimodori
