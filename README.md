# Detecting irregularities using moving z-score

## Summary

[See it live!](https://zscore.herokuapp.com/)

This project is an exercise in detecting irregularities in a time series using z-score.

A simple UI is provided to assist testing the detecting logic, which allows user to type in:

- the `data` set,
- minimum `threshold` for when a certain data point is considered irregular,
- a `window` value, represents the minimum number of data which should be available, before a certain data point can be considered irregular

## Technical Details

The code base is written in Ruby on Rails + React, as such to run it locally, you'll need the following installed:

- Ruby: 2.6.x
- Bundler: 2.0.x
- Node: 12.x
- Yarn: 1.19.x

Once the precondition is fulfilled, you'll need to install dependencies by running:

```sh
> bundle install
```

and

```sh
> yarn
```

If both succeed without any issue, you can then run the server by;

```sh
> rails s
```
