import * as React from 'react';
interface props {
  fill?: string;
}

const SearchIcon = (props: props) => (
  <svg
    width={17}
    height={17}
    viewBox="0 0 17 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.19727 1.50002C5.73857 1.50002 4.33963 2.07948 3.30818 3.11093C2.27673 4.14238 1.69727 5.54133 1.69727 7.00002C1.69727 8.45871 2.27673 9.85766 3.30818 10.8891C4.33963 11.9206 5.73857 12.5 7.19727 12.5C8.65596 12.5 10.0549 11.9206 11.0864 10.8891C12.1178 9.85766 12.6973 8.45871 12.6973 7.00002C12.6973 5.54133 12.1178 4.14238 11.0864 3.11093C10.0549 2.07948 8.65596 1.50002 7.19727 1.50002ZM0.197266 7.00002C0.19736 5.88069 0.465878 4.7777 0.980295 3.78358C1.49471 2.78946 2.24003 1.9332 3.15372 1.28662C4.06741 0.640037 5.12284 0.221995 6.23146 0.0675585C7.34009 -0.0868776 8.46958 0.0267958 9.5252 0.399043C10.5808 0.771291 11.5318 1.39126 12.2983 2.20694C13.0648 3.02262 13.6246 4.01022 13.9306 5.08691C14.2366 6.1636 14.28 7.29797 14.057 8.39488C13.8341 9.49178 13.3513 10.5192 12.6493 11.391L15.9773 14.72C16.051 14.7887 16.1101 14.8715 16.151 14.9635C16.192 15.0555 16.2141 15.1548 16.2159 15.2555C16.2176 15.3562 16.1991 15.4562 16.1614 15.5496C16.1237 15.643 16.0675 15.7278 15.9963 15.7991C15.9251 15.8703 15.8403 15.9264 15.7469 15.9641C15.6535 16.0019 15.5534 16.0204 15.4527 16.0186C15.352 16.0168 15.2527 15.9948 15.1607 15.9538C15.0687 15.9128 14.9859 15.8537 14.9173 15.78L11.5883 12.452C10.5598 13.2804 9.31801 13.801 8.00627 13.9536C6.69454 14.1062 5.36639 13.8847 4.17521 13.3145C2.98404 12.7444 1.97843 11.849 1.27454 10.7316C0.570645 9.61427 0.197176 8.3206 0.197266 7.00002Z"
      fill="white"
      fillOpacity={0.7}
      {...props}
    />
  </svg>
);

export default SearchIcon;
