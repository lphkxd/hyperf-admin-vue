<template>
  <div>
    <ul class="storage-list">
      <li>
        <span>
          <i class="el-icon-info"></i>
          <span class="storage-name">el-icon-info</span>
        </span>
      </li>
      <li>
        <span>
          <i class="el-icon-error"></i>
          <span class="storage-name">el-icon-error</span>
        </span>
      </li>
      <li>
        <span>
          <i class="el-icon-info"></i>
          <span class="storage-name">el-icon-info</span>
        </span>
      </li>
      <li>
        <span>
          <i class="el-icon-error"></i>
          <span class="storage-name">el-icon-error</span>
        </span>
      </li>
      <li>
        <span>
          <i class="el-icon-info"></i>
          <span class="storage-name">el-icon-info</span>
        </span>
      </li>
      <li>
        <span>
          <i class="el-icon-error"></i>
          <span class="storage-name">el-icon-error</span>
        </span>
      </li>
      <li>
        <span>
          <i class="el-icon-info"></i>
          <span class="storage-name">el-icon-info</span>
        </span>
      </li>
      <li>
        <span>
          <i class="el-icon-error"></i>
          <span class="storage-name">el-icon-error</span>
        </span>
      </li>
      <li>
        <span>
          <i class="el-icon-info"></i>
          <span class="storage-name">el-icon-info</span>
        </span>
      </li>
      <li>
        <span>
          <i class="el-icon-error"></i>
          <span class="storage-name">el-icon-error</span>
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
  .storage-list {
    overflow: hidden;
    list-style: none;
    padding: 0;
    border: 1px solid $color-border-1;
    border-radius: 4px;
    background-color: #fff;
  }

  .storage-list li {
    float: left;
    width: 204.5px;
    height: 250px;
    line-height: 120px;
    color: #666;
    font-size: 13px;
    text-align: center;
    /*<!--border-right: 1px solid $color-border-2;-->*/
    /*<!--border-bottom: 1px solid $color-border-2;-->*/
    /*<!--margin-right: -1px;-->*/
    /*<!--margin-bottom: -1px;-->*/
  }

  .storage-list li:after {
    content: "";
    height: 100%;
  }

  .storage-list li:after,
  .storage-list li span {
    display: inline-block;
    vertical-align: middle;
  }

  .storage-list li span {
    line-height: normal;
    color: $color-text-sub;
    transition: color .15s linear;
  }

  .storage-list li i {
    display: block;
    font-size: 32px;
    margin-bottom: 15px;
    color: $color-text-normal;
    transition: color .15s linear
  }

  .storage-list li .storage-name {
    display: inline-block;
    padding: 0 3px;
    height: 1em
  }

  .storage-list li:hover i,
  .storage-list li:hover span {
    color: $color-primary;
    cursor: pointer;
  }
</style>
